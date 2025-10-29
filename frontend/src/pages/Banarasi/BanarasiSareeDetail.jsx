import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaRupeeSign, FaArrowLeft, FaStar, FaRegStar, FaBolt } from "react-icons/fa";
import { sarees } from "../../data/sarees";
import { useCart } from "../../context/CartContext";

const BanarasiSareeDetail = () => {
  const { sareeId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [saree, setSaree] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!saree) return;
    
    setIsAdding(true);
    try {
      // Create a cart item with the required structure
      const cartItem = {
        ...saree,
        // Ensure we have all required fields for the cart
        id: saree.title, // Use title as ID if no ID exists
        price: Math.round(saree.mrp - (saree.mrp * (saree.discountPercent || 0) / 100)),
        originalPrice: saree.mrp,
        discount: saree.discountPercent,
        image: saree.images?.image1
      };
      
      // Add the item to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(cartItem);
      }
      // Show success message
      alert(`${saree.title} ${quantity > 1 ? `(${quantity} items) ` : ''}added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    // First try to get the saree from the navigation state
    if (location.state?.saree) {
      setSaree(location.state.saree);
      return;
    }
    
    // If not in state, try to get from session storage
    const savedSaree = sessionStorage.getItem('currentSaree');
    if (savedSaree) {
      try {
        setSaree(JSON.parse(savedSaree));
        return;
      } catch (error) {
        console.error('Error parsing saved saree data:', error);
      }
    }
    
    // If no saree data is found, redirect to the list
    navigate('/banarasi');
  }, [sareeId, navigate, location.state]);

  if (!saree) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Calculate selling price based on MRP and discount percentage
  const sellingPrice = Math.round(saree.mrp - (saree.mrp * (saree.discountPercent || 0) / 100));

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
                src={saree.images?.image1 || 'https://via.placeholder.com/600x800?text=Image+Not+Available'}
                alt={saree.title}
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{saree.title}</h1>
            
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
                  {sellingPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-gray-400 text-lg line-through ml-4">
                ₹{saree.mrp.toLocaleString()}
              </span>
              {saree.discountPercent > 0 && (
                <span className="bg-pink-100 text-pink-700 text-sm font-medium px-2.5 py-0.5 rounded ml-4">
                  {saree.discountPercent}% OFF
                </span>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {saree.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Product Information</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex">
                    <span className="w-36 font-medium text-gray-600">Brand:</span>
                    <span>{saree.product_info?.brand || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 font-medium text-gray-600">Manufacturer:</span>
                    <span>{saree.product_info?.manufacturer || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 font-medium text-gray-600">Category:</span>
                    <span>{saree.category}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 font-medium text-gray-600">Material:</span>
                    <span>{saree.product_info?.SareeMaterial || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 font-medium text-gray-600">Color:</span>
                    <span>{saree.product_info?.SareeColor || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 font-medium text-gray-600">Length:</span>
                    <span>{saree.product_info?.SareeLength || 'N/A'}</span>
                  </div>
                  {saree.product_info?.IncludedComponents && (
                    <div className="flex">
                      <span className="w-36 font-medium text-gray-600">Included:</span>
                      <span>{saree.product_info.IncludedComponents}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 font-medium mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-70 cursor-pointer"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <FaShoppingCart />
                <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
              </button>
              <button 
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer"
                onClick={handleBuyNow}
              >
                <FaBolt />
                <span>Buy Now</span>
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
