import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSilkHovered, setIsSilkHovered] = useState(false);

  const categories = [
    { 
      name: 'Silk', 
      path: '/silk',
      subcategories: [
        { name: 'Soft Silk Sarees', path: '/silk/soft-silk' },
        { name: 'Kanjivaram Sarees', path: '/silk/kanjivaram' },
        { name: 'Banarasi Sarees', path: '/silk/banarasi' },
        { name: 'Maheshwari Silk', path: '/silk/maheshwari' },
        { name: 'Raw Silk Sarees', path: '/silk/raw-silk' },
        { name: 'Mysore Silk Sarees', path: '/silk/mysore-silk' }
      ]
    },
    { name: 'Cotton', path: '/cotton' },
    { name: 'Linen', path: '/linen' },
    { name: 'Regional', path: '/regional' },
    { name: 'Banarasi', path: '/banarasi' },
  ];

  return (
    <nav className="sticky top-20 z-40 bg-white border-t border-gray-200 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-8 py-3 overflow-visible">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="relative group"
              onMouseEnter={() => category.name === 'Silk' && setIsSilkHovered(true)}
              onMouseLeave={() => category.name === 'Silk' && setIsSilkHovered(false)}
            >
              <div 
                className={`text-gray-700 hover:text-rose-500 font-medium text-sm whitespace-nowrap transition-colors duration-200 relative cursor-pointer ${category.name === 'Silk' ? 'pr-5' : ''}`}
                onClick={() => category.name === 'Silk' && setIsSilkHovered(!isSilkHovered)}
              >
                {category.name}
                {category.name === 'Silk' && (
                  <svg
                    className="w-4 h-4 inline-block ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </div>
              
              {category.name === 'Silk' && category.subcategories && isSilkHovered && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      to={subcategory.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rose-500"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
