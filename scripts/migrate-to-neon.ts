#!/usr/bin/env node

/**
 * Data Migration Script for Neon PostgreSQL
 * This script migrates data from db.json to Neon PostgreSQL database
 */

import { neonClient } from '../src/lib/neon.ts';
import { readFileSync } from 'fs';
import { join } from 'path';

interface DatabaseData {
  doctors: any[];
  services: any[];
  testimonials: any[];
  appointments: any[];
}

async function migrateData() {
  if (!neonClient) {
    console.error('❌ Neon client not configured. Please set up your environment variables.');
    process.exit(1);
  }

  try {
    // Read data from db.json
    const dbPath = join(process.cwd(), 'db.json');
    const dbData: DatabaseData = JSON.parse(readFileSync(dbPath, 'utf8'));

    console.log('🚀 Starting data migration to Neon PostgreSQL...');

    // Migrate doctors
    console.log('📋 Migrating doctors...');
    for (const doctor of dbData.doctors) {
      const result = await neonClient.insert('doctors', {
        full_name: doctor.full_name,
        title: doctor.title,
        specialty_id: doctor.specialty_id,
        bio: doctor.bio,
        education: doctor.education,
        experience_years: doctor.experience_years,
        image_url: doctor.image_url,
        email: doctor.email,
        phone: doctor.phone,
        is_active: doctor.is_active,
        created_at: doctor.created_at,
        updated_at: doctor.updated_at
      });
      
      if (result.error) {
        console.warn(`⚠️  Warning inserting doctor ${doctor.full_name}:`, result.error);
      } else {
        console.log(`✅ Doctor ${doctor.full_name} migrated successfully`);
      }
    }

    // Migrate services
    console.log('📋 Migrating services...');
    for (const service of dbData.services) {
      const result = await neonClient.insert('services', {
        name: service.name,
        description: service.description,
        duration_minutes: service.duration_minutes,
        price_range: service.price_range,
        specialty_id: service.specialty_id,
        is_active: service.is_active,
        created_at: service.created_at
      });
      
      if (result.error) {
        console.warn(`⚠️  Warning inserting service ${service.name}:`, result.error);
      } else {
        console.log(`✅ Service ${service.name} migrated successfully`);
      }
    }

    // Migrate testimonials
    console.log('📋 Migrating testimonials...');
    for (const testimonial of dbData.testimonials) {
      const result = await neonClient.insert('testimonials', {
        patient_name: testimonial.patient_name,
        rating: testimonial.rating,
        comment: testimonial.comment,
        doctor_id: testimonial.doctor_id,
        is_approved: testimonial.is_approved,
        created_at: testimonial.created_at
      });
      
      if (result.error) {
        console.warn(`⚠️  Warning inserting testimonial from ${testimonial.patient_name}:`, result.error);
      } else {
        console.log(`✅ Testimonial from ${testimonial.patient_name} migrated successfully`);
      }
    }

    // Migrate appointments
    console.log('📋 Migrating appointments...');
    for (const appointment of dbData.appointments) {
      const result = await neonClient.insert('appointments', {
        patient_name: appointment.patient_name,
        patient_email: appointment.patient_email,
        patient_phone: appointment.patient_phone,
        doctor_id: appointment.doctor_id,
        service_id: appointment.service_id,
        preferred_date: appointment.preferred_date,
        preferred_time: appointment.preferred_time,
        notes: appointment.notes,
        status: appointment.status
      });
      
      if (result.error) {
        console.warn(`⚠️  Warning inserting appointment for ${appointment.patient_name}:`, result.error);
      } else {
        console.log(`✅ Appointment for ${appointment.patient_name} migrated successfully`);
      }
    }

    console.log('🎉 Data migration completed successfully!');
    
    // Verify migration
    console.log('🔍 Verifying migration...');
    const doctorsCount = await neonClient.select('doctors');
    const servicesCount = await neonClient.select('services');
    const testimonialsCount = await neonClient.select('testimonials');
    const appointmentsCount = await neonClient.select('appointments');

    console.log(`📊 Migration Summary:`);
    console.log(`   - Doctors: ${doctorsCount.data.length}`);
    console.log(`   - Services: ${servicesCount.data.length}`);
    console.log(`   - Testimonials: ${testimonialsCount.data.length}`);
    console.log(`   - Appointments: ${appointmentsCount.data.length}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateData();
}

export { migrateData };
