import React from 'react';
import { Link } from 'react-router-dom';

const Collections = () => {
  const collections = [
    { name: 'Silk Sarees', count: 150, color: 'from-pink-400 to-pink-600' },
    { name: 'Cotton Sarees', count: 200, color: 'from-amber-400 to-amber-600' },
    { name: 'Designer Sarees', count: 80, color: 'from-purple-400 to-purple-600' },
    { name: 'Bridal Collection', count: 50, color: 'from-rose-400 to-rose-600' },
    { name: 'Festive Wear', count: 120, color: 'from-orange-400 to-orange-600' },
    { name: 'Casual Sarees', count: 180, color: 'from-teal-400 to-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent">
            Our Collections
          </h1>
          <p className="text-gray-600 text-lg">
            Curated collections for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              to={`/shop?collection=${collection.name.toLowerCase().replace(' ', '-')}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`h-64 bg-gradient-to-br ${collection.color} flex items-center justify-center`}>
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">{collection.name}</h3>
                  <p className="text-sm opacity-90">{collection.count} Products</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
