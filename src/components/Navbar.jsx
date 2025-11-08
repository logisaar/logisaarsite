import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';
import logo from '../image/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/offer', label: 'Offer' },
    { path: '/projects', label: 'Projects' },
    { path: '/testimonials', label: 'Meta' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' },
    { path: '/intern-hiring', label: 'Intern Hiring' }

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-emerald-400/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="LogiSaar Logo" className="h-10 w-auto" />
            <span className="text-2xl font-semibold">
              <span className="text-emerald-400">logi</span>
              <span className="text-violet-600">saar</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
                    isActive(item.path)
                      ? 'text-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-400/20'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-violet-600 transform scale-x-100 transition-transform duration-300"></div>
                  )}
                  {!isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="group relative bg-gradient-to-r from-emerald-500 to-violet-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-emerald-600 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Get Quote</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md border-t border-emerald-400/20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 bg-gradient-to-r from-emerald-500 to-violet-600 text-white px-3 py-2 rounded-md text-base font-medium hover:from-emerald-600 hover:to-violet-700 transition-all duration-300"
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

