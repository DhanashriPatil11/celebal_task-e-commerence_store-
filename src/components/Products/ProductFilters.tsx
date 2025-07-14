import React from 'react';
import { Grid, List, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/products';
import { SortOption, ViewMode } from '../../types';

export function ProductFilters() {
  const { state, dispatch } = useApp();
  
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={state.selectedCategory}
              onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={state.sortBy}
              onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value as SortOption })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })}
              className={`px-3 py-2 text-sm ${
                state.viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })}
              className={`px-3 py-2 text-sm ${
                state.viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Showing {state.filteredProducts.length} of {state.products.length} products
      </div>
    </div>
  );
}