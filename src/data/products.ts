import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Electronics',
    description: 'High-quality wireless headphones with active noise cancellation, premium audio drivers, and 30-hour battery life.',
    rating: 4.8,
    reviews: 324,
    inStock: true,
    features: ['Active Noise Cancellation', '30-hour battery', 'Premium drivers', 'Quick charge'],
    brand: 'AudioTech',
    sku: 'AT-WH-001'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Wearables',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity.',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking'],
    brand: 'FitPro',
    sku: 'FP-SW-002'
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Electronics',
    description: 'Portable Bluetooth speaker with 360-degree sound, waterproof design, and 12-hour battery.',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    features: ['360° Sound', 'Waterproof', '12-hour battery', 'Portable'],
    brand: 'SoundWave',
    sku: 'SW-BT-003'
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Accessories',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    rating: 4.2,
    reviews: 67,
    inStock: true,
    features: ['Fast Charging', 'Qi Compatible', 'LED Indicator', 'Slim Design'],
    brand: 'ChargeTech',
    sku: 'CT-WC-004'
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Gaming',
    description: 'Mechanical gaming keyboard with RGB backlighting, tactile switches, and programmable keys.',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    features: ['RGB Backlighting', 'Tactile Switches', 'Programmable Keys', 'Gaming Optimized'],
    brand: 'GameMaster',
    sku: 'GM-KB-005'
  },
  {
    id: '6',
    name: 'USB-C Hub',
    price: 59.99,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Accessories',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
    rating: 4.3,
    reviews: 145,
    inStock: true,
    features: ['7-in-1 Design', 'HDMI Output', 'USB 3.0', 'Power Delivery'],
    brand: 'ConnectPro',
    sku: 'CP-HUB-006'
  }
];

export const categories = [
  'All',
  'Electronics',
  'Wearables',
  'Accessories',
  'Gaming'
];