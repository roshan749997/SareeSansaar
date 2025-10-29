import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchSarees } from "../../services/api";

const BanarasiSareeList = () => {
  const navigate = useNavigate();
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSarees = async () => {
      try {
        setLoading(true);
        const data = await fetchSarees("Banarasi");
        setSarees(data);
      } catch (err) {
        console.error("Failed to load sarees:", err);
        setError("Failed to load sarees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSarees();
  }, []);

  const handleCardClick = (saree) => {
    navigate(`/product/${saree._id}`);
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
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto">

        {sarees.length === 0 ? (
          <p className="text-center text-gray-500">
            No sarees found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sarees.map((saree) => (
              <div
                key={saree.title}
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(saree)}
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/4] bg-gray-50">
                  <img
                    src={
                      saree.images?.image1 ||
                      "https://via.placeholder.com/300x400?text=Image+Not+Available"
                    }
                    alt={saree.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x400?text=Image+Not+Available";
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Sponsored</p>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {saree.product_info?.manufacturer || "VARNICRAFTS"}
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-1">
                    {saree.title || "Woven Banarasi Art Silk Saree"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {saree.color || "Purple"}
                  </p>

                  <div className="flex items-center gap-1 mt-1">
                    <FaRupeeSign className="h-3 w-3 text-gray-800" />
                    <span className="text-base font-bold text-gray-900">
                      {saree.price?.toLocaleString() ||
                        (
                          saree.mrp -
                          saree.mrp * ((saree.discountPercent || 0) / 100)
                        ).toLocaleString()}
                    </span>
                    {saree.mrp && (
                      <span className="text-gray-400 text-xs line-through ml-1">
                        ₹{saree.mrp.toLocaleString()}
                      </span>
                    )}
                    {(saree.discountPercent > 0 || saree.discount) && (
                      <span className="text-green-600 text-xs font-medium ml-1">
                        {(saree.discountPercent || saree.discount)}% off
                      </span>
                    )}
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
