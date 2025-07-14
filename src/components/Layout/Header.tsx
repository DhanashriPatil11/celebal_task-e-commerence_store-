import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CartDrawer } from '../Cart/CartDrawer';
import { AuthModal } from '../Auth/AuthModal';

export function Header() {
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleAuthClick = () => {
    dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: 'login' });
  };
  
  const handleCartClick = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EliteStore</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={state.searchQuery}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>{state.user ? state.user.firstName : 'Login'}</span>
              </button>
              
              <button
                onClick={handleCartClick}
                className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="border-t pt-2 flex space-x-4">
                <button
                  onClick={() => {
                    handleAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{state.user ? state.user.firstName : 'Login'}</span>
                </button>
                
                <button
                  onClick={() => {
                    handleCartClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <CartDrawer />
      <AuthModal />
    </>
  );
}