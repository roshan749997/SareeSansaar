import React from 'react';

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent">
            Shop Sarees
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our exquisite collection of handcrafted sarees
          </p>
        </div>

        {/* Placeholder for product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Saree Name</h3>
                <p className="text-pink-600 font-bold">₹2,999</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
