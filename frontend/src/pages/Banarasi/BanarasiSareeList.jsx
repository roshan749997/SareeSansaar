import React, { useContext } from "react";
import { FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { sarees } from "../../data/sarees";
import { useCart } from "../../context/CartContext";

const BanarasiSareeList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = (saree) => {
    // Use the title to create a URL-friendly slug
    const slug = saree.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-');      // Replace multiple hyphens with single
    
    // Store the full saree data in session storage to pass to the detail page
    sessionStorage.setItem('currentSaree', JSON.stringify(saree));
    
    // Navigate to the detail page with the slug and ID
    navigate(`/banarasi/${slug}`, { state: { saree } });
  };

  const handleAddToCart = (e, saree) => {
    e.stopPropagation();
    console.log('Add to cart clicked for:', saree.id); // Debug log
    try {
      addToCart(saree);
      console.log('Item added to cart successfully');
      // Optional: Add a toast notification
      alert(`${saree.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Banarasi Silk Sarees</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sarees.map((saree) => (
            <div 
              key={saree.title}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              onClick={() => handleCardClick(saree)}
            >
              {/* Product Image */}
              <div className="relative bg-white p-1.5">
                <div className="relative pt-[100%] overflow-hidden">
                  <img 
                    src={saree.images?.image1 || 'https://via.placeholder.com/300x300?text=Image+Not+Available'} 
                    alt={saree.title}
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
                  {saree.title || saree.name}
                </h3>
                {saree.product_info?.manufacturer && (
                  <p className="text-gray-500 text-xs mb-2 line-clamp-1">By {saree.product_info.manufacturer}</p>
                )}
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="flex items-center">
                      <FaRupeeSign className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-900 font-bold text-lg ml-1">
                        {saree.price?.toLocaleString() || (saree.mrp - (saree.mrp * (saree.discountPercent || 0) / 100)).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs line-through">
                      ₹{saree.mrp?.toLocaleString() || saree.originalPrice?.toLocaleString()}
                    </span>
                    {(saree.discountPercent > 0 || saree.discount) && (
                      <span className="text-orange-500 text-xs font-medium">
                        {(saree.discountPercent || saree.discount)}% OFF
                      </span>
                    )}
                  </div>
                
                  <button 
                    className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-1.5 px-3 text-sm rounded-md flex items-center justify-center space-x-1 hover:opacity-90 transition-opacity cursor-pointer mt-2"
                    onClick={(e) => handleAddToCart(e, saree)}
                    aria-label={`Add ${saree.name} to cart`}
                  >
                    <FaShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BanarasiSareeList;
