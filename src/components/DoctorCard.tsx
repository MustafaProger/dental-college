import { Mail, Phone, GraduationCap, Award } from 'lucide-react';
import type { Doctor } from '../lib/api';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectDoctor: (doctorId: number) => void;
}

export function DoctorCard({ doctor, onSelectDoctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
        {doctor.image_url ? (
          <img
            src={doctor.image_url}
            alt={doctor.full_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {doctor.full_name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.full_name}</h3>
        <p className="text-teal-600 font-semibold mb-2">{doctor.title}</p>
        {doctor.specialty_name && (
          <p className="text-gray-600 text-sm mb-4">{doctor.specialty_name}</p>
        )}

        <p className="text-gray-700 mb-4 line-clamp-3">{doctor.bio}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span className="line-clamp-1">{doctor.education || 'Education details available upon request'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-teal-600" />
            <span>{doctor.experience_years} years of experience</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 pt-4 border-t">
          {doctor.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-teal-600" />
              <a href={`mailto:${doctor.email}`} className="hover:text-teal-600 transition-colors">
                {doctor.email}
              </a>
            </div>
          )}
          {doctor.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-teal-600" />
              <a href={`tel:${doctor.phone}`} className="hover:text-teal-600 transition-colors">
                {doctor.phone}
              </a>
            </div>
          )}
        </div>

        <button
          onClick={() => onSelectDoctor(doctor.id)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
