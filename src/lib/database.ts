export class DatabaseClient {
  baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  getDoctors() { return this.request('/doctors'); }
  getServices() { return this.request('/services'); }
  getTestimonials() { return this.request('/testimonials'); }
  getAppointments() { return this.request('/appointments'); }
  createAppointment(data: any) {
    return this.request('/appointments', { method: 'POST', body: JSON.stringify(data) });
  }
}

export const db = new DatabaseClient();