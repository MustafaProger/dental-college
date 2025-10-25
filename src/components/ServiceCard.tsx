import { Clock, DollarSign, Sparkles } from 'lucide-react';
import type { Service } from '../lib/api';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border-l-4 border-gradient-to-b from-teal-500 to-blue-600 card-hover glow-effect group relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Sparkles className="w-6 h-6 text-teal-500 spin-slow" />
      </div>
      
      {/* Градиентный фон при наведении */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
            {service.name}
          </h3>
          {service.specialty_name && (
            <p className="text-sm text-teal-600 font-semibold mb-3 bg-teal-50 px-3 py-1 rounded-full inline-block">
              {service.specialty_name}
            </p>
          )}
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">{service.duration_minutes} minutes</span>
          </div>
          {service.price_range && (
            <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">{service.price_range}</span>
            </div>
          )}
        </div>
        
        {/* Индикатор прогресса */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 h-1 rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
        </div>
      </div>
    </div>
  );
}
