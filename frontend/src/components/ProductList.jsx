import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaSpinner } from 'react-icons/fa';
import { fetchSarees } from '../services/api';

const ProductList = ({ defaultCategory } = {}) => {
  const { categoryName, subCategoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Normalize slug -> friendly string (replace hyphens)
  const normalize = (s) => (s ? s.replace(/-/g, ' ') : '');
  // Prefer subCategoryName for filtering when present (most DBs store subcategory as the product category)
  const effectiveCategory = subCategoryName
    ? normalize(subCategoryName)
    : (categoryName || defaultCategory) ? normalize(categoryName || defaultCategory) : '';

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        // If there's no category defined, fetch all products (backend will return all)
        const data = await fetchSarees(effectiveCategory || '');
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryName, subCategoryName, defaultCategory]);

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
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
        {/* Heading */}
        <div className="px-4 mb-6">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            {categoryName || defaultCategory ? (
              <>
                {normalize(categoryName || defaultCategory)}{subCategoryName ? ` • ${normalize(subCategoryName)}` : ''}
              </>
            ) : (
              'All Sarees'
            )}
          </h1>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((p) => (
              <div
                key={p._id || p.title}
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(p)}
              >
                <div className="relative w-full aspect-3/4 bg-gray-50">
                  <img
                    src={p.images?.image1 || 'https://via.placeholder.com/300x400?text=Image+Not+Available'}
                    alt={p.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
                    }}
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Sponsored</p>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {p.product_info?.manufacturer || 'VARNICRAFTS'}
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-1">{p.title || 'Untitled Product'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.color || ''}</p>

                  <div className="flex items-center gap-1 mt-1">
                    <FaRupeeSign className="h-3 w-3 text-gray-800" />
                    <span className="text-base font-bold text-gray-900">
                      {p.price?.toLocaleString() || (p.mrp - p.mrp * ((p.discountPercent || 0) / 100)).toLocaleString()}
                    </span>
                    {p.mrp && <span className="text-gray-400 text-xs line-through ml-1">₹{p.mrp.toLocaleString()}</span>}
                    {(p.discountPercent > 0 || p.discount) && (
                      <span className="text-green-600 text-xs font-medium ml-1">{(p.discountPercent || p.discount)}% off</span>
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

export default ProductList;
