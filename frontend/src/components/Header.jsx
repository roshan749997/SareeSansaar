import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const headerRef = useRef(null);

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
    { 
      name: 'Cotton', 
      path: '/cotton',
      subcategories: [
        { name: 'Cotton Ikkat', path: '/cotton/ikkat' },
        { name: 'Cotton Printed', path: '/cotton/printed' },
        { name: 'Cotton Jamdani', path: '/cotton/jamdani' }
      ]
    },
    { 
      name: 'Linen', 
      path: '/linen',
      subcategories: [
        { name: 'Linen Silk', path: '/linen/silk' },
        { name: 'Linen Cotton', path: '/linen/cotton' },
        { name: 'Pure Linen', path: '/linen/pure' }
      ]
    },
    { 
      name: 'Regional', 
      path: '/regional',
      subcategories: [
        { name: 'Kanjivaram', path: '/regional/kanjivaram' },
        { name: 'Banarasi', path: '/regional/banarasi' },
        { name: 'Chanderi', path: '/regional/chanderi' },
        { name: 'Paithani', path: '/regional/paithani' }
      ]
    },
    { 
      name: 'Banarasi', 
      path: '/banarasi',
      subcategories: [
        { name: 'Pure Silk Banarasi', path: '/banarasi/pure-silk' },
        { name: 'Organza Banarasi', path: '/banarasi/organza' },
        { name: 'Georgette Banarasi', path: '/banarasi/georgette' }
      ]
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (categoryName) => {
    setActiveCategory(prev => (prev === categoryName ? null : categoryName));
  };

  return (
    <header className="fixed top-20 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8 py-3" ref={headerRef}>
          {categories.map((category) => (
            <div key={category.name} className="relative group">
              <div 
                className={`flex items-center text-gray-700 hover:text-rose-500 font-medium text-sm whitespace-nowrap transition-colors duration-200 relative cursor-pointer ${
                  activeCategory === category.name ? 'text-rose-500' : ''
                }`}
                onClick={() => handleClick(category.name)}
              >
                {category.name}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    activeCategory === category.name ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </div>

              {/* Dropdown */}
              {category.subcategories && activeCategory === category.name && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                >
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      to={subcategory.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rose-500 transition-colors duration-150"
                      onClick={() => setActiveCategory(null)}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation - Horizontal Scroll */}
        <div className="md:hidden -mx-4">
          {/* Main Categories */}
          <div className="flex space-x-2 overflow-x-auto px-4 pt-3 pb-2 hide-scrollbar">
            {categories.map((category) => (
              <div key={category.name} className="flex-shrink-0">
                <button
                  onClick={() => handleClick(category.name === activeCategory ? null : category.name)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                    activeCategory === category.name 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>
          
          {/* Subcategories */}
          {activeCategory && (
            <div className="bg-white border-t border-gray-200 mt-2 py-3">
              <div className="flex items-center justify-between px-4 mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  {categories.find(cat => cat.name === activeCategory)?.name} Categories
                </h3>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="text-rose-500 text-sm font-medium"
                >
                  Close
                </button>
              </div>
              <div className="px-4 space-y-1">
                {categories
                  .find(cat => cat.name === activeCategory)
                  ?.subcategories?.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      to={subcategory.path}
                      onClick={() => setActiveCategory(null)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors duration-200"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
              </div>
            </div>
          )}
          
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
              height: 0;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
              scrollbar-height: none;
            }
          `}</style>
        </div>
      </div>
    </header>
  );
};

export default Header;
