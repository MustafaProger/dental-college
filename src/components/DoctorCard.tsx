import { Mail, Phone, GraduationCap, Award, Star } from 'lucide-react';
import type { Doctor } from '../lib/api';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectDoctor: (doctorId: number) => void;
}

export function DoctorCard({ doctor, onSelectDoctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover glow-effect group">
      <div className="aspect-square bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
        {doctor.image_url ? (
          <img
            src={doctor.image_url}
            alt={doctor.full_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-load"
          />
        ) : (
          <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
            <span className="text-4xl font-bold text-white">
              {doctor.full_name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Декоративные элементы */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <Star className="w-5 h-5 text-yellow-500 star-twinkle" />
        </div>
        
        {/* Градиентный оверлей */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors duration-300">
            {doctor.full_name}
          </h3>
          <p className="text-teal-600 font-semibold mb-2 text-lg">{doctor.title}</p>
          {doctor.specialty_name && (
            <p className="text-gray-600 text-sm mb-4 bg-teal-50 px-3 py-1 rounded-full inline-block">
              {doctor.specialty_name}
            </p>
          )}
        </div>

        <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">{doctor.bio}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            <div className="bg-teal-100 p-2 rounded-lg group-hover:bg-teal-200 transition-colors duration-300">
              <GraduationCap className="w-4 h-4 text-teal-600" />
            </div>
            <span className="line-clamp-1">{doctor.education || 'Education details available upon request'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <span>{doctor.experience_years} years of experience</span>
          </div>
        </div>

        <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
          {doctor.email && (
            <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                <Mail className="w-4 h-4 text-purple-600" />
              </div>
              <a 
                href={`mailto:${doctor.email}`} 
                className="hover:text-teal-600 transition-colors duration-300 truncate"
              >
                {doctor.email}
              </a>
            </div>
          )}
          {doctor.phone && (
            <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <a 
                href={`tel:${doctor.phone}`} 
                className="hover:text-teal-600 transition-colors duration-300"
              >
                {doctor.phone}
              </a>
            </div>
          )}
        </div>

        <button
          onClick={() => onSelectDoctor(doctor.id)}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 glow-effect group/btn"
        >
          <span className="group-hover/btn:scale-110 transition-transform duration-300 inline-block">
            Book Appointment
          </span>
        </button>
      </div>
    </div>
  );
}
