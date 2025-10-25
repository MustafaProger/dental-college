// Database client that works with our proxy server
// This client connects to our Node.js server which proxies requests to Neon

class DatabaseClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Database request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Doctors API
  async getDoctors() {
    console.log('🔍 Fetching doctors from Neon database via proxy...');
    return this.request<any[]>('/doctors');
  }

  // Services API
  async getServices() {
    console.log('🔍 Fetching services from Neon database via proxy...');
    return this.request<any[]>('/services');
  }

  // Testimonials API
  async getTestimonials(limit?: number) {
    console.log('🔍 Fetching testimonials from Neon database via proxy...');
    return this.request<any[]>('/testimonials');
  }

  // Appointments API
  async createAppointment(appointment: any) {
    console.log('🔍 Creating appointment in Neon database via proxy...');
    return this.request<any>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }
}

// Create and export the database client instance
export const databaseClient = new DatabaseClient();

// Export types for TypeScript
export interface Doctor {
  id: number;
  full_name: string;
  title: string;
  specialty_id: number;
  bio: string;
  education: string;
  experience_years: number;
  image_url: string;
  email: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
  price_range: string;
  specialty_id: number;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  patient_name: string;
  rating: number;
  comment: string;
  doctor_id: number;
  is_approved: boolean;
  created_at: string;
}

export interface Appointment {
  id?: number;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  doctor_id: number;
  service_id: number;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  status: string;
  created_at?: string;
}
