import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, ViewMode, SortOption } from '../types';
import { products } from '../data/products';

interface AppState {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  user: User | null;
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
}

type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'TOGGLE_AUTH_MODAL'; payload?: 'login' | 'register' }
  | { type: 'FILTER_PRODUCTS' };

const initialState: AppState = {
  products,
  filteredProducts: products,
  cart: [],
  user: null,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'name',
  viewMode: 'grid',
  isCartOpen: false,
  isAuthModalOpen: false,
  authMode: 'login',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'TOGGLE_AUTH_MODAL':
      return {
        ...state,
        isAuthModalOpen: !state.isAuthModalOpen,
        authMode: action.payload || state.authMode,
      };
    
    case 'FILTER_PRODUCTS': {
      let filtered = [...state.products];
      
      // Filter by category
      if (state.selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }
      
      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      // Sort products
      filtered.sort((a, b) => {
        switch (state.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
      
      return { ...state, filteredProducts: filtered };
    }
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        if (Array.isArray(cartItems)) {
          cartItems.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_TO_CART', payload: item.product });
            if (item.quantity > 1) {
              dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.product.id, quantity: item.quantity } });
            }
          });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  
  // Filter products whenever relevant state changes
  useEffect(() => {
    dispatch({ type: 'FILTER_PRODUCTS' });
  }, [state.searchQuery, state.selectedCategory, state.sortBy]);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}