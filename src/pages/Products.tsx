import React from 'react';
import { ProductFilters } from '../components/Products/ProductFilters';
import { ProductGrid } from '../components/Products/ProductGrid';

export function Products() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of premium electronics</p>
        </div>
        
        <ProductFilters />
        <ProductGrid />
      </div>
    </div>
  );
}