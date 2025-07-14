import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const { dispatch } = useApp();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="flex">
            <div className="w-48 h-48 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              Sale
            </div>
          )}
          <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}