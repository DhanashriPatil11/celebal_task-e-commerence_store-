import React from 'react';
import { ProductCard } from './ProductCard';
import { useApp } from '../../context/AppContext';

export function ProductGrid() {
  const { state } = useApp();
  
  if (state.filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 text-center max-w-md">
          We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }
  
  return (
    <div className={`grid gap-6 ${
      state.viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {state.filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={state.viewMode}
        />
      ))}
    </div>
  );
}