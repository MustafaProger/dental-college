// Neon PostgreSQL client configuration
// This file provides a simple HTTP-based client for Neon PostgreSQL

interface NeonConfig {
  url: string;
  apiKey: string;
}

interface QueryResult<T = any> {
  data: T[];
  error?: string;
}

class NeonClient {
  private config: NeonConfig;
  private baseUrl: string;

  constructor(config: NeonConfig) {
    this.config = config;
    this.baseUrl = config.url.replace('postgresql://', 'https://').replace(':5432', '');
  }

  private async executeQuery<T = any>(query: string, params: any[] = []): Promise<QueryResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          query,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        data: result.rows || [],
        error: result.error,
      };
    } catch (error) {
      console.error('Neon query error:', error);
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Generic query method
  async query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
    return this.executeQuery<T>(sql, params);
  }

  // Table operations
  async select<T = any>(table: string, where?: Record<string, any>, limit?: number): Promise<QueryResult<T>> {
    let sql = `SELECT * FROM ${table}`;
    const params: any[] = [];
    
    if (where) {
      const conditions = Object.keys(where).map((key, index) => {
        params.push(where[key]);
        return `${key} = $${index + 1}`;
      });
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    if (limit) {
      sql += ` LIMIT ${limit}`;
    }

    return this.executeQuery<T>(sql, params);
  }

  async insert<T = any>(table: string, data: Record<string, any>): Promise<QueryResult<T>> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
    
    const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    
    return this.executeQuery<T>(sql, values);
  }

  async update<T = any>(table: string, data: Record<string, any>, where: Record<string, any>): Promise<QueryResult<T>> {
    const setClause = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const whereClause = Object.keys(where).map((key, index) => `${key} = $${Object.keys(data).length + index + 1}`).join(' AND ');
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause} RETURNING *`;
    const params = [...Object.values(data), ...Object.values(where)];
    
    return this.executeQuery<T>(sql, params);
  }

  async delete<T = any>(table: string, where: Record<string, any>): Promise<QueryResult<T>> {
    const whereClause = Object.keys(where).map((key, index) => `${key} = $${index + 1}`).join(' AND ');
    const sql = `DELETE FROM ${table} WHERE ${whereClause} RETURNING *`;
    
    return this.executeQuery<T>(sql, Object.values(where));
  }
}

// Environment variables for Neon
const neonUrl = import.meta.env.VITE_NEON_URL;
const neonApiKey = import.meta.env.VITE_NEON_API_KEY;

// Create Neon client instance
let neonClient: NeonClient | null = null;

if (neonUrl && neonApiKey) {
  neonClient = new NeonClient({
    url: neonUrl,
    apiKey: neonApiKey,
  });
} else {
  console.warn('Neon configuration not found. Using mock data.');
}

export { neonClient, NeonClient };
export type { NeonConfig, QueryResult };
