import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { 
    cart = [], 
    updateQuantity, 
    removeFromCart, 
    cartTotal = 0, 
    cartCount = 0,
    clearCart 
  } = useCart();

  console.log('Cart component rendered with:', { cart, cartTotal, cartCount }); // Debug log

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Continue Shopping
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <FaShoppingCart className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex items-start border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md cursor-pointer"
                  onClick={() => navigate(`/banarasi/${item.id}`)}
                />
                <div className="ml-4 flex-1">
                  <h3 
                    className="text-lg font-medium text-gray-800 cursor-pointer hover:text-amber-600"
                    onClick={() => navigate(`/banarasi/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{item.material} with {item.work}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 border-x border-gray-300">{item.quantity || 1}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                  {item.originalPrice > item.price && (
                    <p className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={() => alert('Proceeding to checkout...')}
                className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity font-medium"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={clearCart}
                className="w-full mt-3 text-red-500 border border-red-300 py-2 px-4 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Clear Cart
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <h3 className="font-medium text-amber-800 mb-2">Free Shipping</h3>
              <p className="text-sm text-amber-700">Enjoy free shipping on all orders over ₹999</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
