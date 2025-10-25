import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DoctorCard } from './components/DoctorCard';
import { ServiceCard } from './components/ServiceCard';
import { TestimonialCard } from './components/TestimonialCard';
import { AppointmentModal } from './components/AppointmentModal';
import { DatabaseStatus } from './components/DatabaseStatus';
import { apiClient, type Doctor, type Service, type Testimonial } from './lib/api';
import { Users, Briefcase, MessageCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onBookAppointment={() => handleBookAppointment()} />
      
      {/* Database Status Component - for development/testing */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Status</h2>
          <DatabaseStatus />
        </div>
      </section>

      <section id="doctors" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-4">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Dentists
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced team of dental professionals is committed to providing
              personalized care tailored to your unique needs.
            </p>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No doctors available at the moment. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelectDoctor={handleBookAppointment}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">Our Services</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Dental Care
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From routine check-ups to advanced treatments, we offer a full range
              of dental services to keep your smile healthy and bright.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Services information will be available soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Patient Reviews</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied patients who have experienced
              exceptional care at our practice.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Be the first to share your experience with us!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">BrightSmile Dental</h3>
            <p className="text-gray-400 mb-6">
              Excellence in Dental Care - Creating Healthy, Beautiful Smiles
            </p>
            <button
              onClick={() => handleBookAppointment()}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Schedule Your Visit Today
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
