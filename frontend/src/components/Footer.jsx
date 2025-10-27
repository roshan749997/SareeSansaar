import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com',
      color: 'hover:text-pink-600'
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-cream-50 to-amber-50 border-t border-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">
              SareeSansaar
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover the elegance of traditional Indian sarees. We bring you the finest collection of handcrafted sarees from across India.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-white rounded-full shadow-md text-gray-600 ${social.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-pink-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/shipping" className="hover:text-pink-500 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-pink-500 transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-pink-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-pink-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-pink-500 flex-shrink-0 mt-0.5" />
                <span>123 Saree Street, Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-pink-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-pink-500 flex-shrink-0" />
                <span>info@sareesansaar.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-pink-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © 2025 SareeSansaar. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link to="/terms" className="hover:text-pink-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-pink-500 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-pink-500 to-amber-500"></div>
    </footer>
  );
};

export default Footer;
