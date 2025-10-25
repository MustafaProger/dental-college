// API client for Neon PostgreSQL
import { neonClient } from './neon';
import { mockData } from './mockData';

class ApiClient {
  private useNeon: boolean;

  constructor() {
    this.useNeon = !!neonClient;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Fallback to mock data if Neon is not available
    if (!this.useNeon) {
      return this.getMockData(endpoint);
    }

    try {
      // Use Neon client for database operations
      return await this.executeNeonQuery(endpoint, options);
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      // Fallback to mock data on error
      return this.getMockData(endpoint);
    }
  }

  private async executeNeonQuery<T>(endpoint: string, options: RequestInit): Promise<T> {
    if (!neonClient) {
      throw new Error('Neon client not available');
    }

    // Parse endpoint and execute appropriate query
    const [table, query] = endpoint.split('?');
    
    switch (table) {
      case '/doctors':
        if (query?.includes('is_active=true')) {
          const result = await neonClient.select('doctors', { is_active: true });
          return result.data as T;
        }
        const doctorsResult = await neonClient.select('doctors');
        return doctorsResult.data as T;
        
      case '/services':
        if (query?.includes('is_active=true')) {
          const result = await neonClient.select('services', { is_active: true });
          return result.data as T;
        }
        const servicesResult = await neonClient.select('services');
        return servicesResult.data as T;
        
      case '/testimonials':
        if (query?.includes('is_approved=true')) {
          const result = await neonClient.select('testimonials', { is_approved: true });
          return result.data as T;
        }
        const testimonialsResult = await neonClient.select('testimonials');
        return testimonialsResult.data as T;
        
      case '/appointments':
        if (options.method === 'POST') {
          const body = await options.body;
          const appointmentData = typeof body === 'string' ? JSON.parse(body) : body;
          const result = await neonClient.insert('appointments', appointmentData);
          return result.data[0] as T;
        }
        const appointmentsResult = await neonClient.select('appointments');
        return appointmentsResult.data as T;
        
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  private getMockData<T>(endpoint: string): T {
    const [table] = endpoint.split('?');
    
    switch (table) {
      case '/doctors':
        return mockData.doctors as T;
      case '/services':
        return mockData.services as T;
      case '/testimonials':
        return mockData.testimonials as T;
      case '/appointments':
        return [] as T; // Empty array for appointments
      default:
        return [] as T;
    }
  }

  // Doctors API
  async getDoctors() {
    return this.request<any[]>('/doctors?is_active=true');
  }

  async getDoctor(id: number) {
    return this.request<any>(`/doctors/${id}`);
  }

  // Services API
  async getServices() {
    return this.request<any[]>('/services?is_active=true');
  }

  async getService(id: number) {
    return this.request<any>(`/services/${id}`);
  }

  // Testimonials API
  async getTestimonials(limit?: number) {
    let endpoint = '/testimonials?is_approved=true&_sort=created_at&_order=desc';
    if (limit) {
      endpoint += `&_limit=${limit}`;
    }
    return this.request<any[]>(endpoint);
  }

  // Appointments API
  async createAppointment(appointment: any) {
    return this.request<any>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  async getAppointments() {
    return this.request<any[]>('/appointments');
  }

  // Testimonials API
  async createTestimonial(testimonial: any) {
    return this.request<any>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    });
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient();

// Export types for TypeScript
export interface Doctor {
  id: number;
  full_name: string;
  title: string;
  specialty_id: number;
  specialty_name: string;
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
  specialty_name: string;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  patient_name: string;
  rating: number;
  comment: string;
  doctor_id: number;
  doctor_name: string;
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


