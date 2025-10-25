import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import logo from '../image/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-4 mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid with logo, contact, links, socials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="LogiSaar Logo" className="h-10 w-auto" />
            <span className="text-2xl font-semibold">
              <span className="text-emerald-400">logi</span>
              <span className="text-violet-600">saar</span>
            </span>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
            <p className="mb-2">Email: <a href="mailto:logisaar@gmail.com" className="text-emerald-400 hover:underline">logisaar@gmail.com</a></p>
            <p className="mb-2">Phone: <a href="tel:91 7815014638" className="text-emerald-400 hover:underline">+91 781-5014-638</a></p>
            <p className="mb-2">Phone: <a href="tel:91 8249585134" className="text-emerald-400 hover:underline">+91 824-9585-134</a></p>
            <p>Address:  Logisaar St, chandaka <br />Bhubaneswar, Odisha</p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
              <li><Link to="/projects" className="hover:text-emerald-400">Projects / Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400">Services</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media Handles */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-emerald-400">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-emerald-400">
                <Github size={24} />
              </a>
              <a href="https://www.instagram.com/logisaar?utm_source=ig_web_button_share_sheet&igsh=MTdsb3FuZ3F5NjB0dQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-emerald-400">
                <Instagram size={24} />
              </a>
              <a href="https://www.instagram.com/logisaar?igsh=NnJ0enpyd3pnamFs" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-emerald-400">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

      </div>
      {/* Copyright Notice at bottom */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; 2025 logisaar. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
