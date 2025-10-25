// src/lib/api.ts
class ApiClient {
  baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Request failed: ${response.status} ${text}`);
    }

    return response.json();
  }

  // --- API endpoints ---
  getDoctors(): Promise<Doctor[]> {
    return this.request<Doctor[]>('/doctors');
  }

  getServices(): Promise<Service[]> {
    return this.request<Service[]>('/services');
  }

  getTestimonials(limit?: number): Promise<Testimonial[]> {
    const endpoint = limit ? `/testimonials?limit=${limit}` : '/testimonials';
    return this.request<Testimonial[]>(endpoint);
  }

  getAppointments() {
    return this.request('/appointments');
  }

  createAppointment(appointment: any) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }
}

// Экспортируем экземпляр
export const apiClient = new ApiClient();

// --- типы ---
export interface Doctor {
  id: number;
  full_name: string;
  title: string;
  specialty_id: number;
  specialty_name?: string;
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
  specialty_name?: string;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  patient_name: string;
  rating: number;
  comment: string;
  doctor_id: number;
  doctor_name?: string;
  is_approved: boolean;
  created_at: string;
}