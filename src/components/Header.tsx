import { Smile } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <Smile className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BrightSmile Dental</h1>
              <p className="text-sm text-gray-600">Excellence in Dental Care</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#doctors" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Our Doctors
            </a>
            <a href="#services" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Services
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Reviews
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
