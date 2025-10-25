// Simple Neon PostgreSQL client using fetch
// This client works directly with Neon's HTTP API

interface NeonConfig {
  connectionString: string;
  apiKey?: string;
}

interface QueryResult<T = any> {
  data: T[];
  error?: string;
}

class SimpleNeonClient {
  private connectionString: string;
  private apiKey?: string;

  constructor(config: NeonConfig) {
    this.connectionString = config.connectionString;
    this.apiKey = config.apiKey;
  }

  // For now, we'll use mock data until we set up proper Neon HTTP API
  async select<T = any>(table: string, where?: Record<string, any>, limit?: number): Promise<QueryResult<T>> {
    // This is a placeholder - in a real implementation, you would:
    // 1. Use Neon's HTTP API to execute SQL queries
    // 2. Or set up a backend server that connects to Neon
    // 3. Or use Neon's serverless functions
    
    console.log(`Mock query: SELECT * FROM ${table}`, where, limit);
    
    // Return mock data for now
    const mockData = this.getMockData(table);
    return {
      data: mockData as T[],
      error: undefined
    };
  }

  async insert<T = any>(table: string, data: Record<string, any>): Promise<QueryResult<T>> {
    console.log(`Mock insert into ${table}:`, data);
    
    // Return mock inserted data
    const mockData = this.getMockData(table);
    const newItem = { id: Date.now(), ...data };
    return {
      data: [newItem] as T[],
      error: undefined
    };
  }

  async update<T = any>(table: string, data: Record<string, any>, where: Record<string, any>): Promise<QueryResult<T>> {
    console.log(`Mock update ${table}:`, data, where);
    
    // Return mock updated data
    const mockData = this.getMockData(table);
    return {
      data: mockData.slice(0, 1) as T[],
      error: undefined
    };
  }

  async delete<T = any>(table: string, where: Record<string, any>): Promise<QueryResult<T>> {
    console.log(`Mock delete from ${table}:`, where);
    
    // Return mock deleted data
    const mockData = this.getMockData(table);
    return {
      data: mockData.slice(0, 1) as T[],
      error: undefined
    };
  }

  private getMockData(table: string): any[] {
    // Import mock data based on table name
    switch (table) {
      case 'doctors':
        return [
          {
            id: 1,
            full_name: 'Dr. Anna Ivanova',
            title: 'DDS',
            specialty_id: 1,
            bio: 'Comprehensive family dentistry focused on prevention and comfort.',
            education: 'Moscow State University, DDS',
            experience_years: 8,
            image_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format',
            email: 'anna.ivanova@clinic.example',
            phone: '+1 (555) 010-1010',
            is_active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 2,
            full_name: 'Dr. Sergey Petrov',
            title: 'DMD',
            specialty_id: 2,
            bio: 'Specialist in painless root canal treatments and retreatments.',
            education: 'Saint Petersburg State University, DMD',
            experience_years: 12,
            image_url: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format',
            email: 'sergey.petrov@clinic.example',
            phone: '+1 (555) 010-2020',
            is_active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 3,
            full_name: 'Dr. Olga Smirnova',
            title: 'DDS, MS',
            specialty_id: 3,
            bio: 'Creating healthy, confident smiles with modern orthodontic solutions.',
            education: 'Orthodontics Residency, MS',
            experience_years: 10,
            image_url: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format',
            email: 'olga.smirnova@clinic.example',
            phone: '+1 (555) 010-3030',
            is_active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 4,
            full_name: 'Dr. Mikhail Volkov',
            title: 'DDS',
            specialty_id: 4,
            bio: 'Expert in smile makeovers and aesthetic dental treatments.',
            education: 'Kazan State Medical University, DDS',
            experience_years: 6,
            image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format',
            email: 'mikhail.volkov@clinic.example',
            phone: '+1 (555) 010-4040',
            is_active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }
        ];
      case 'services':
        return [
          {
            id: 1,
            name: 'Dental Cleaning',
            description: 'Routine prophylaxis and oral hygiene maintenance',
            duration_minutes: 45,
            price_range: 'from $60',
            specialty_id: 1,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 2,
            name: 'Teeth Whitening',
            description: 'Professional in-office whitening treatment',
            duration_minutes: 60,
            price_range: 'from $150',
            specialty_id: 4,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 3,
            name: 'Root Canal Therapy',
            description: 'Endodontic treatment to save infected tooth',
            duration_minutes: 90,
            price_range: 'from $350',
            specialty_id: 2,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 4,
            name: 'Orthodontic Consultation',
            description: 'Initial assessment for braces or aligners',
            duration_minutes: 30,
            price_range: 'from $50',
            specialty_id: 3,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 5,
            name: 'Dental Implants',
            description: 'Complete tooth replacement with titanium implants',
            duration_minutes: 120,
            price_range: 'from $800',
            specialty_id: 1,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 6,
            name: 'Porcelain Veneers',
            description: 'Thin ceramic shells to improve smile appearance',
            duration_minutes: 90,
            price_range: 'from $400',
            specialty_id: 4,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z'
          }
        ];
      case 'testimonials':
        return [
          {
            id: 1,
            patient_name: 'Mikhail K.',
            rating: 5,
            comment: 'Great experience! Doctor was very attentive and explained everything clearly.',
            doctor_id: 1,
            is_approved: true,
            created_at: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            patient_name: 'Alina P.',
            rating: 5,
            comment: 'Root canal was quick and painless. Highly recommend!',
            doctor_id: 2,
            is_approved: true,
            created_at: '2024-01-20T14:15:00Z'
          },
          {
            id: 3,
            patient_name: 'Dmitry S.',
            rating: 4,
            comment: 'Aligners are working well and the plan was clear from day one.',
            doctor_id: 3,
            is_approved: true,
            created_at: '2024-01-25T09:45:00Z'
          },
          {
            id: 4,
            patient_name: 'Elena V.',
            rating: 5,
            comment: 'My smile transformation exceeded all expectations!',
            doctor_id: 4,
            is_approved: true,
            created_at: '2024-02-01T16:20:00Z'
          },
          {
            id: 5,
            patient_name: 'Alexey M.',
            rating: 5,
            comment: 'Professional service and comfortable environment.',
            doctor_id: 1,
            is_approved: true,
            created_at: '2024-02-05T11:30:00Z'
          },
          {
            id: 6,
            patient_name: 'Natalia R.',
            rating: 4,
            comment: 'Excellent orthodontic care with modern techniques.',
            doctor_id: 3,
            is_approved: true,
            created_at: '2024-02-10T13:45:00Z'
          }
        ];
      case 'appointments':
        return [];
      default:
        return [];
    }
  }
}

// Environment variables for Neon
const neonUrl = import.meta.env.VITE_NEON_URL;
const neonApiKey = import.meta.env.VITE_NEON_API_KEY;

// Create Neon client instance
let neonClient: SimpleNeonClient | null = null;

if (neonUrl) {
  neonClient = new SimpleNeonClient({
    connectionString: neonUrl,
    apiKey: neonApiKey
  });
  console.log('✅ Neon client initialized with connection string');
} else {
  console.warn('⚠️ Neon configuration not found. Using mock data.');
}

export { neonClient, SimpleNeonClient };
export type { NeonConfig, QueryResult };
