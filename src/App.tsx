import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DoctorCard } from './components/DoctorCard';
import { ServiceCard } from './components/ServiceCard';
import { TestimonialCard } from './components/TestimonialCard';
import { AppointmentModal } from './components/AppointmentModal';
import { apiClient, type Doctor, type Service, type Testimonial } from './lib/api';
import { Users, Briefcase, MessageCircle, Calendar } from 'lucide-react';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    console.log('Loading data from JSON Server...');

    try {
      const [doctorsData, servicesData, testimonialsData] = await Promise.all([
        apiClient.getDoctors(),
        apiClient.getServices(),
        apiClient.getTestimonials(6)
      ]);

      console.log('Doctors data:', doctorsData);
      console.log('Services data:', servicesData);
      console.log('Testimonials data:', testimonialsData);

      setDoctors(doctorsData);
      setServices(servicesData);
      setTestimonials(testimonialsData);

      console.log('Final state - Doctors:', doctorsData.length, 'Services:', servicesData.length, 'Testimonials:', testimonialsData.length);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctorId?: number) => {
    setSelectedDoctorId(doctorId);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen animated-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-teal-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-b-blue-400 rounded-full animate-spin mx-auto" style={{ animationDuration: '2s' }}></div>
          </div>
          <p className="text-white text-xl font-semibold loading-dots">Loading data</p>
          <div className="mt-4 w-64 bg-white/20 rounded-full h-2 mx-auto">
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <Hero onBookAppointment={() => handleBookAppointment()} />

      <section id="doctors" className="py-20 bg-white relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-6 py-3 rounded-full mb-6 glow-effect">
              <Users className="w-6 h-6 pulse-glow" />
              <span className="font-bold text-lg">Our Team</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shimmer">
              Meet Our Expert Dentists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced team of dental professionals is committed to providing 
              <span className="text-teal-600 font-semibold"> personalized care</span>, 
              tailored to your unique needs.
            </p>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-16 scale-in">
              <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-600 text-lg">
                  No doctors available at the moment. Please check back soon.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <div 
                  key={doctor.id} 
                  className="fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <DoctorCard
                    doctor={doctor}
                    onSelectDoctor={handleBookAppointment}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-10 morphing"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-teal-200 rounded-full opacity-10 morphing" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full mb-6 glow-effect">
              <Briefcase className="w-6 h-6 pulse-glow" />
              <span className="font-bold text-lg">Our Services</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shimmer">
              Comprehensive Dental Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From routine check-ups to advanced treatments, we offer a full range
              <span className="text-blue-600 font-semibold"> of dental services</span>, 
              to keep your smile healthy and bright.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-16 scale-in">
              <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-600 text-lg">
                  Services information will be available soon.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-16 left-16 w-28 h-28 bg-yellow-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-36 h-36 bg-orange-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 px-6 py-3 rounded-full mb-6 glow-effect">
              <MessageCircle className="w-6 h-6 pulse-glow" />
              <span className="font-bold text-lg">Patient Reviews</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shimmer">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Read testimonials from our satisfied patients who have experienced
              <span className="text-yellow-600 font-semibold"> exceptional care</span> 
              at our practice.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-16 scale-in">
              <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-600 text-lg">
                  Be the first to share your experience with us!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-teal-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center fade-in-up">
            <h3 className="text-4xl font-black mb-6 text-shimmer">BrightSmile Dental</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Excellence in Dental Care - Creating Healthy, Beautiful Smiles
            </p>
            <button
              onClick={() => handleBookAppointment()}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-500 shadow-2xl hover:shadow-teal-500/25 hover:scale-110 glow-effect"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Schedule Your Visit Today</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </footer>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoctorId(undefined);
        }}
        selectedDoctorId={selectedDoctorId}
      />
    </div>
  );
}

export default App;
