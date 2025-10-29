-- Seed data for dental-college

INSERT INTO specialties (name) VALUES
  ('Therapist') ON CONFLICT DO NOTHING;

INSERT INTO doctors (full_name, title, specialty_id, bio, education, experience_years, image_url, email, phone)
VALUES
  ('Dr. Alice Smith', 'DDS', (SELECT id FROM specialties WHERE name='Therapist'), 'Experienced dentist', 'Harvard Dental', 8, '/img/alice.jpg', 'alice@example.com', '+1 555 111 2233')
ON CONFLICT DO NOTHING;

INSERT INTO services (name, description, duration_minutes, price_range, specialty_id)
VALUES
  ('General Consultation', 'Primary dental consultation', 30, '$50-$80', (SELECT id FROM specialties WHERE name='Therapist'))
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (patient_name, rating, comment, doctor_id)
VALUES
  ('John Doe', 5, 'Great experience!', (SELECT id FROM doctors LIMIT 1));

INSERT INTO appointments (patient_name, patient_email, patient_phone, doctor_id, service_id, preferred_date, preferred_time, notes, status)
VALUES
  ('Jane Roe', 'jane@example.com', '+1 555 222 3344', (SELECT id FROM doctors LIMIT 1), (SELECT id FROM services LIMIT 1), CURRENT_DATE + INTERVAL '1 day', '10:00', 'N/A', 'pending');



