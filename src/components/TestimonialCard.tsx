import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../lib/api';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 card-hover glow-effect group relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Quote className="w-8 h-8 text-teal-500" />
      </div>
      
      {/* Градиентный фон при наведении */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Звезды рейтинга */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 transition-all duration-300 ${
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400 star-twinkle'
                  : 'text-gray-300'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        
        {/* Текст отзыва */}
        <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          "{testimonial.comment}"
        </blockquote>
        
        {/* Информация о пациенте */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              {testimonial.patient_name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors duration-300">
                {testimonial.patient_name}
              </p>
              {testimonial.doctor_name && (
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  Patient of Dr. {testimonial.doctor_name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                {new Date(testimonial.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Индикатор прогресса */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
        </div>
      </div>
    </div>
  );
}
