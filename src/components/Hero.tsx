import { Calendar } from 'lucide-react';

interface HeroProps {
  onBookAppointment: () => void;
}

export function Hero({ onBookAppointment }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Smile, Our Priority
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience exceptional dental care with our team of skilled professionals
            dedicated to creating healthy, beautiful smiles.
          </p>
          <button
            onClick={onBookAppointment}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
