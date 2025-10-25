import { Smile, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-3 rounded-xl shadow-lg glow-effect group-hover:scale-110 transition-all duration-300">
              <Smile className="w-8 h-8 text-white tooth-bounce" />
            </div>
            <div className="fade-in-up">
              <h1 className="text-2xl font-bold text-gray-900 text-shimmer">
                BrightSmile Dental
              </h1>
              <p className="text-sm text-gray-600 wave">
                Excellence in Dental Care
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 fade-in-up">
            <a 
              href="#doctors" 
              className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Our Doctors
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#services" 
              className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:scale-110 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg scale-in">
            <nav className="flex flex-col gap-4">
              <a 
                href="#doctors" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-300 hover:scale-105 py-2"
              >
                Our Doctors
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-300 hover:scale-105 py-2"
              >
                Services
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-teal-600 font-medium transition-all duration-300 hover:scale-105 py-2"
              >
                Reviews
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
