import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { apiClient, type Doctor, type Service } from '../lib/api';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctorId?: number;
}

export function AppointmentModal({ isOpen, onClose, selectedDoctorId }: AppointmentModalProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    doctor_id: selectedDoctorId || '',
    service_id: '',
    preferred_date: '',
    preferred_time: '',
    notes: '',
  });

  useEffect(() => {
    if (isOpen) {
      loadDoctorsAndServices();
      if (selectedDoctorId) {
        setFormData(prev => ({ ...prev, doctor_id: selectedDoctorId }));
      }
    }
  }, [isOpen, selectedDoctorId]);

  const loadDoctorsAndServices = async () => {
    try {
      const [doctorsData, servicesData] = await Promise.all([
        apiClient.getDoctors(),
        apiClient.getServices()
      ]);

      setDoctors(doctorsData);
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading doctors and services:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus('idle');

    try {
      await apiClient.createAppointment({
        ...formData,
        doctor_id: formData.doctor_id || null,
        service_id: formData.service_id || null,
        status: 'pending'
      });

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          patient_name: '',
          patient_email: '',
          patient_phone: '',
          doctor_id: selectedDoctorId || '',
          service_id: '',
          preferred_date: '',
          preferred_time: '',
          notes: '',
        });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-enter shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200 px-6 py-6 flex items-center justify-between z-[9999]">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-shimmer">Book an Appointment</h2>
            <p className="text-gray-600 mt-1">Fill out the form below to schedule</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="fade-in-up">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.patient_name}
              onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
              placeholder="John Doe"
            />
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.patient_email}
              onChange={(e) => setFormData({ ...formData, patient_email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
              placeholder="john@example.com"
            />
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.patient_phone}
              onChange={(e) => setFormData({ ...formData, patient_phone: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Select Doctor
            </label>
            <select
              value={formData.doctor_id}
              onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
            >
              <option value="">Any Available Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Select Service
            </label>
            <select
              value={formData.service_id}
              onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
            >
              <option value="">General Consultation</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Preferred Time *
              </label>
              <select
                required
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
              >
                <option value="">Select time</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-gray-300"
              placeholder="Any specific concerns or requirements..."
            />
          </div>

          {submitStatus === 'success' && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="font-semibold">Appointment request submitted successfully! We'll contact you soon.</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="font-semibold">Failed to submit appointment. Please try again.</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 glow-effect disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting request...</span>
              </div>
            ) : (
              'Submit Appointment Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
