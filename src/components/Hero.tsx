import { Calendar, Sparkles, Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  onBookAppointment: () => void;
}

export function Hero({ onBookAppointment }: HeroProps) {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    // Создаем частицы для анимации
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Анимированный градиентный фон */}
      <div className="absolute inset-0 animated-gradient"></div>
      
      {/* Частицы */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-20 left-10 text-teal-400 opacity-30">
        <Sparkles className="w-16 h-16 spin-slow" />
      </div>
      <div className="absolute top-40 right-20 text-blue-400 opacity-30">
        <Heart className="w-12 h-12 heartbeat" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-400 opacity-30">
        <Star className="w-14 h-14 star-twinkle" />
      </div>
      <div className="absolute bottom-20 right-10 text-teal-400 opacity-30">
        <Sparkles className="w-10 h-10 spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Главный заголовок с анимацией */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-4 fade-in-up">
              <span className="text-shimmer">Your Smile</span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-shimmer">Our Priority</span>
            </h2>
          </div>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed fade-in-up" style={{ animationDelay: '0.4s' }}>
            Experience exceptional dental care with our team of 
            <span className="text-shimmer font-semibold"> skilled professionals</span>, 
            dedicated to creating healthy and beautiful smiles.
          </p>

          {/* Кнопка записи */}
          <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={onBookAppointment}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-500 shadow-2xl hover:shadow-teal-500/25 hover:scale-110 glow-effect"
            >
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Book an Appointment</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="glass-effect rounded-2xl p-6 card-hover">
              <div className="text-3xl font-bold text-teal-600 mb-2">15+</div>
              <div className="text-gray-700 font-medium">Years of Experience</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 card-hover">
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-700 font-medium">Happy Patients</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 card-hover">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Emergency Care</div>
            </div>
          </div>
        </div>
      </div>

      {/* Волны внизу */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-white opacity-80">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
