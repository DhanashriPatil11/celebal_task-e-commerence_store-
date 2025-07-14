import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { state, dispatch } = useApp();
  
  const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };
  
  const handleCheckout = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  if (!state.isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p>Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {state.cart.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center block"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}