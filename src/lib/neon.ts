// Neon PostgreSQL client for real database operations
// This client works with Neon's HTTP API

interface NeonConfig {
  connectionString: string;
  apiKey?: string;
}

interface QueryResult<T = any> {
  data: T[];
  error?: string;
}

class NeonClient {
  private connectionString: string;
  private apiKey?: string;
  private projectId: string;

  constructor(config: NeonConfig) {
    this.connectionString = config.connectionString;
    this.apiKey = config.apiKey;
    
    // Extract project ID from connection string
    const match = config.connectionString.match(/ep-([^-]+)-([^-]+)-([^-]+)/);
    if (match) {
      this.projectId = match[1];
    } else {
      throw new Error('Invalid Neon connection string');
    }
  }

  private async executeQuery<T = any>(query: string, params: any[] = []): Promise<QueryResult<T>> {
    try {
      // Используем Neon HTTP API через правильный endpoint
      const response = await fetch(`https://api.neon.tech/v2/projects/${this.projectId}/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          query,
          params,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
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

console.log('🔍 Debug info:');
console.log('Neon URL:', neonUrl ? 'Set' : 'Not set');
console.log('Neon API Key:', neonApiKey ? 'Set' : 'Not set');

// Create Neon client instance
let neonClient: NeonClient | null = null;

if (neonUrl && neonApiKey) {
  try {
    neonClient = new NeonClient({
      connectionString: neonUrl,
      apiKey: neonApiKey
    });
    console.log('✅ Neon client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Neon client:', error);
  }
} else {
  console.error('❌ Neon configuration not found. Please set VITE_NEON_URL and VITE_NEON_API_KEY in .env file');
}

export { neonClient, NeonClient };
export type { NeonConfig, QueryResult };
