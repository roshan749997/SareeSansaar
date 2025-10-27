import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaRupeeSign, FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa";
import { sarees } from "../../data/sarees";

const BanarasiSareeDetail = () => {
  const { sareeId } = useParams();
  const navigate = useNavigate();
  const [saree, setSaree] = useState(null);

  useEffect(() => {
    const selectedSaree = sarees.find(s => s.id === parseInt(sareeId));
    if (selectedSaree) {
      setSaree(selectedSaree);
    } else {
      navigate('/banarasi');
    }
  }, [sareeId, navigate]);

  if (!saree) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-pink-600 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div className="w-full overflow-hidden rounded-xl bg-gray-50">
            <div className="relative pt-[120%] overflow-hidden">
              <img
                src={saree.image}
                alt={saree.name}
                className="absolute top-0 left-0 w-full h-full object-contain p-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x800?text=Image+Not+Available';
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="py-4 px-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{saree.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  star <= 4 ? <FaStar key={star} /> : <FaRegStar key={star} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">(24 Reviews)</span>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <FaRupeeSign className="text-gray-700" />
                <span className="text-3xl font-bold text-gray-900 ml-1">
                  {saree.price.toLocaleString()}
                </span>
              </div>
              <span className="text-green-600 text-lg line-through ml-4">
                ₹{saree.originalPrice.toLocaleString()}
              </span>
              <span className="bg-pink-100 text-pink-700 text-sm font-medium px-2.5 py-0.5 rounded ml-4">
                {saree.discount}% OFF
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {saree.description}
              </p>
              
              <div className="mt-4 space-y-2">
                <p className="text-gray-700"><span className="font-medium">Material:</span> {saree.material}</p>
                <p className="text-gray-700"><span className="font-medium">Work:</span> {saree.work}</p>
                <p className="text-gray-700"><span className="font-medium">Category:</span> {saree.category}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                onClick={() => {
                  // Add to cart logic here
                }}
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
              <button className="flex-1 bg-white border-2 border-pink-500 text-pink-600 py-3 px-6 rounded-lg hover:bg-pink-50 transition-colors">
                Buy Now
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Free shipping on orders over ₹5,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanarasiSareeDetail;
