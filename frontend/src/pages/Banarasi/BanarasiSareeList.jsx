import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaRupeeSign, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { fetchSarees } from "../../services/api";

const BanarasiSareeList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSarees = async () => {
      try {
        setLoading(true);
        const data = await fetchSarees('Banarasi');
        setSarees(data);
      } catch (err) {
        console.error('Failed to load sarees:', err);
        setError('Failed to load sarees. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSarees();
  }, []);

  const handleCardClick = (saree) => {
    // Navigate to the product detail page using the product ID
    navigate(`/product/${saree._id}`);
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
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Banarasi Silk Sarees</h1>
        {sarees.length === 0 ? (
          <p className="text-center text-gray-500">No sarees found in this category.</p>
        ) : (
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
                    className="w-full bg-[#FFD814] text-gray-900 py-2 px-3 text-sm rounded-md flex items-center justify-center space-x-2 hover:bg-[#F7CA00] transition-colors disabled:opacity-70 cursor-pointer mt-3 shadow-sm border border-[#FCD200]"
                    onClick={(e) => handleAddToCart(e, saree)}
                    aria-label={`Add ${saree.title} to cart`}
                  >
                    <FaShoppingCart className="h-4 w-4" />
                    <span className="text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BanarasiSareeList;
