import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const categories = [
    { name: 'Banarasi', path: '/banarasi' },
    { name: 'Kanjivaram', path: '/shop?category=kanjivaram' },
    { name: 'Paithani', path: '/shop?category=paithani' },
    { name: 'Sambalpuri', path: '/shop?category=sambalpuri' },
    { name: 'Chanderi', path: '/shop?category=chanderi' },
    { name: 'Bandhani', path: '/shop?category=bandhani' },
    { name: 'Patola', path: '/shop?category=patola' },
    { name: 'Mysore Silk', path: '/shop?category=mysore-silk' },
    { name: 'Baluchari', path: '/shop?category=baluchari' },
    { name: 'Tant', path: '/shop?category=tant' },
  ];

  return (
    <nav className="sticky top-20 z-40 bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-8 py-3 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-gray-700 hover:text-rose-500 font-medium text-sm whitespace-nowrap transition-colors duration-200 relative group"
            >
              {category.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
