// API client for Neon PostgreSQL via Proxy Server
import { databaseClient } from './database';

class ApiClient {
  constructor() {
    console.log('🔍 API Client initializing...');
    console.log('✅ API Client initialized successfully');
  }

  // Doctors API
  async getDoctors() {
    return databaseClient.getDoctors();
  }

  // Services API
  async getServices() {
    return databaseClient.getServices();
  }

  // Testimonials API
  async getTestimonials(limit?: number) {
    return databaseClient.getTestimonials(limit);
  }

  // Appointments API
  async createAppointment(appointment: any) {
    return databaseClient.createAppointment(appointment);
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