import { Clock, DollarSign } from 'lucide-react';
import type { Service } from '../lib/api';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-teal-600">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
      {service.specialty_name && (
        <p className="text-sm text-teal-600 font-semibold mb-3">{service.specialty_name}</p>
      )}
      <p className="text-gray-700 mb-4">{service.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          <span>{service.duration_minutes} minutes</span>
        </div>
        {service.price_range && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-teal-600" />
            <span>{service.price_range}</span>
          </div>
        )}
      </div>
    </div>
  );
}
