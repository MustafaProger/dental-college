export interface Database {
  public: {
    Tables: {
      specialties: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          created_at?: string;
        };
      };
      doctors: {
        Row: {
          id: string;
          full_name: string;
          title: string;
          specialty_id: string | null;
          bio: string;
          education: string;
          experience_years: number;
          image_url: string;
          email: string;
          phone: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          title: string;
          specialty_id?: string | null;
          bio?: string;
          education?: string;
          experience_years?: number;
          image_url?: string;
          email?: string;
          phone?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          title?: string;
          specialty_id?: string | null;
          bio?: string;
          education?: string;
          experience_years?: number;
          image_url?: string;
          email?: string;
          phone?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          duration_minutes: number;
          price_range: string;
          specialty_id: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          duration_minutes?: number;
          price_range?: string;
          specialty_id?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          duration_minutes?: number;
          price_range?: string;
          specialty_id?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          doctor_id: string | null;
          service_id: string | null;
          preferred_date: string;
          preferred_time: string;
          notes: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          doctor_id?: string | null;
          service_id?: string | null;
          preferred_date: string;
          preferred_time: string;
          notes?: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_name?: string;
          patient_email?: string;
          patient_phone?: string;
          doctor_id?: string | null;
          service_id?: string | null;
          preferred_date?: string;
          preferred_time?: string;
          notes?: string;
          status?: string;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          patient_name: string;
          rating: number;
          comment: string;
          doctor_id: string | null;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_name: string;
          rating: number;
          comment: string;
          doctor_id?: string | null;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_name?: string;
          rating?: number;
          comment?: string;
          doctor_id?: string | null;
          is_approved?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
