-- SQL Schema for Dental Clinic Database
-- This file contains the database schema for Neon PostgreSQL

-- Create specialties table
CREATE TABLE IF NOT EXISTS specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    title VARCHAR(50),
    specialty_id INTEGER REFERENCES specialties(id),
    bio TEXT,
    education TEXT,
    experience_years INTEGER DEFAULT 0,
    image_url TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    duration_minutes INTEGER DEFAULT 30,
    price_range VARCHAR(100),
    specialty_id INTEGER REFERENCES specialties(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(200) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    doctor_id INTEGER REFERENCES doctors(id),
    service_id INTEGER REFERENCES services(id),
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(200) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    doctor_id INTEGER REFERENCES doctors(id),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial specialties data
INSERT INTO specialties (name, description, icon) VALUES
('General Dentistry', 'Comprehensive dental care for all ages', 'tooth'),
('Endodontics', 'Root canal therapy and endodontic treatments', 'root-canal'),
('Orthodontics', 'Braces and teeth alignment treatments', 'braces'),
('Cosmetic Dentistry', 'Smile makeovers and aesthetic treatments', 'smile')
ON CONFLICT (name) DO NOTHING;

-- Insert initial doctors data
INSERT INTO doctors (full_name, title, specialty_id, bio, education, experience_years, image_url, email, phone, is_active) VALUES
('Dr. Anna Ivanova', 'DDS', 1, 'Comprehensive family dentistry focused on prevention and comfort.', 'Moscow State University, DDS', 8, 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format', 'anna.ivanova@clinic.example', '+1 (555) 010-1010', true),
('Dr. Sergey Petrov', 'DMD', 2, 'Specialist in painless root canal treatments and retreatments.', 'Saint Petersburg State University, DMD', 12, 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format', 'sergey.petrov@clinic.example', '+1 (555) 010-2020', true),
('Dr. Olga Smirnova', 'DDS, MS', 3, 'Creating healthy, confident smiles with modern orthodontic solutions.', 'Orthodontics Residency, MS', 10, 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format', 'olga.smirnova@clinic.example', '+1 (555) 010-3030', true),
('Dr. Mikhail Volkov', 'DDS', 4, 'Expert in smile makeovers and aesthetic dental treatments.', 'Kazan State Medical University, DDS', 6, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format', 'mikhail.volkov@clinic.example', '+1 (555) 010-4040', true)
ON CONFLICT DO NOTHING;

-- Insert initial services data
INSERT INTO services (name, description, duration_minutes, price_range, specialty_id, is_active) VALUES
('Dental Cleaning', 'Routine prophylaxis and oral hygiene maintenance', 45, 'from $60', 1, true),
('Teeth Whitening', 'Professional in-office whitening treatment', 60, 'from $150', 4, true),
('Root Canal Therapy', 'Endodontic treatment to save infected tooth', 90, 'from $350', 2, true),
('Orthodontic Consultation', 'Initial assessment for braces or aligners', 30, 'from $50', 3, true),
('Dental Implants', 'Complete tooth replacement with titanium implants', 120, 'from $800', 1, true),
('Porcelain Veneers', 'Thin ceramic shells to improve smile appearance', 90, 'from $400', 4, true)
ON CONFLICT DO NOTHING;

-- Insert initial testimonials data
INSERT INTO testimonials (patient_name, rating, comment, doctor_id, is_approved) VALUES
('Mikhail K.', 5, 'Great experience! Doctor was very attentive and explained everything clearly.', 1, true),
('Alina P.', 5, 'Root canal was quick and painless. Highly recommend!', 2, true),
('Dmitry S.', 4, 'Aligners are working well and the plan was clear from day one.', 3, true),
('Elena V.', 5, 'My smile transformation exceeded all expectations!', 4, true),
('Alexey M.', 5, 'Professional service and comfortable environment.', 1, true),
('Natalia R.', 4, 'Excellent orthodontic care with modern techniques.', 3, true)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty_id);
CREATE INDEX IF NOT EXISTS idx_doctors_active ON doctors(is_active);
CREATE INDEX IF NOT EXISTS idx_services_specialty ON services(specialty_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_service ON appointments(service_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_doctor ON testimonials(doctor_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
