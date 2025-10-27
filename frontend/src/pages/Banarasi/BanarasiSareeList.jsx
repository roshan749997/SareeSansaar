import React from "react";
import { FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { sarees } from "../../data/sarees";

const BanarasiSareeList = () => {
  const navigate = useNavigate();

  const handleCardClick = (sareeId) => {
    navigate(`/banarasi/${sareeId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Banarasi Silk Sarees</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sarees.map((saree) => (
            <div 
              key={saree.id}
className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              onClick={() => handleCardClick(saree.id)}
            >
              {/* Product Image */}
              <div className="relative bg-white p-1.5">
                <div className="relative pt-[100%] overflow-hidden">
                  <img 
                    src={saree.image} 
                    alt={saree.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-1.5"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
                    }}
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-2 sm:p-3 flex-grow flex flex-col">
                <h3 className="text-gray-900 font-semibold text-base mb-1 line-clamp-2 h-12">
                  {saree.name}
                </h3>
                <p className="text-gray-500 text-xs mb-2 line-clamp-2 h-6">{saree.material} with {saree.work}</p>
                
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="flex items-center">
                    <FaRupeeSign className="h-4 w-4 text-gray-700" />
                    <span className="text-gray-900 font-bold text-lg ml-1">{saree.price.toLocaleString()}</span>
                  </div>
                  <span className="text-green-600 text-xs line-through">₹{saree.originalPrice.toLocaleString()}</span>
                  <span className="text-orange-500 text-xs font-medium">{saree.discount}% OFF</span>
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-1.5 px-3 text-sm rounded-md flex items-center justify-center space-x-1 hover:opacity-90 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                >
                  <FaShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BanarasiSareeList;
