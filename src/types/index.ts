export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  brand: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: Date;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'price-low' | 'price-high' | 'rating';