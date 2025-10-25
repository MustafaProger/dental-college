// Mock data for dental clinic
export const mockData = {
  doctors: [
    {
      id: '1',
      full_name: 'Dr. Anna Ivanova',
      title: 'DDS',
      specialty_id: '1',
      specialty_name: 'General Dentistry',
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
      id: '3',
      full_name: 'Dr. Olga Smirnova',
      title: 'DDS, MS',
      specialty_id: '3',
      specialty_name: 'Orthodontics',
      bio: 'Creating healthy, confident smiles with modern orthodontic solutions.',
      education: 'Orthodontics Residency, MS',
      experience_years: 10,
      image_url: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format',
      email: 'olga.smirnova@clinic.example',
      phone: '+1 (555) 010-3030',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  
  services: [
    {
      id: '1',
      name: 'Dental Cleaning',
      description: 'Routine prophylaxis and oral hygiene maintenance',
      duration_minutes: 45,
      price_range: 'from $60',
      specialty_id: '1',
      specialty_name: 'General Dentistry',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Teeth Whitening',
      description: 'Professional in-office whitening treatment',
      duration_minutes: 60,
      price_range: 'from $150',
      specialty_id: '4',
      specialty_name: 'Cosmetic Dentistry',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Root Canal Therapy',
      description: 'Endodontic treatment to save infected tooth',
      duration_minutes: 90,
      price_range: 'from $350',
      specialty_id: '2',
      specialty_name: 'Endodontics',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      name: 'Orthodontic Consultation',
      description: 'Initial assessment for braces or aligners',
      duration_minutes: 30,
      price_range: 'from $50',
      specialty_id: '3',
      specialty_name: 'Orthodontics',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z'
    }
  ],
  
  testimonials: [
    {
      id: '1',
      patient_name: 'Mikhail K.',
      rating: 5,
      comment: 'Great experience! Doctor was very attentive and explained everything clearly.',
      doctor_id: '1',
      doctor_name: 'Dr. Anna Ivanova',
      is_approved: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      patient_name: 'Alina P.',
      rating: 5,
      comment: 'Root canal was quick and painless. Highly recommend!',
      doctor_id: '2',
      doctor_name: 'Dr. Sergey Petrov',
      is_approved: true,
      created_at: '2024-01-20T14:15:00Z'
    },
    {
      id: '3',
      patient_name: 'Dmitry S.',
      rating: 4,
      comment: 'Aligners are working well and the plan was clear from day one.',
      doctor_id: '3',
      doctor_name: 'Dr. Olga Smirnova',
      is_approved: true,
      created_at: '2024-01-25T09:45:00Z'
    }
  ]
};
