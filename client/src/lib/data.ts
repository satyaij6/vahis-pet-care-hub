
import beagleImg from '@assets/generated_images/cute_beagle_puppy.png';
import kittenImg from '@assets/generated_images/fluffy_persian_kitten.png';
import goldenImg from '@assets/generated_images/golden_retriever_puppy_smiling.png';

export interface Pet {
  id: number;
  name: string;
  breed: string;
  type: 'dog' | 'cat' | 'other';
  ageWeeks: number;
  gender: 'Male' | 'Female';
  priceMin: number;
  priceMax: number;
  status: 'Available' | 'Sold' | 'Reserved';
  imageUrl: string;
  featured: boolean;
  description: string;
}

export const pets: Pet[] = [
  {
    id: 1,
    name: "Barney",
    breed: "Beagle",
    type: "dog",
    ageWeeks: 8,
    gender: "Male",
    priceMin: 25000,
    priceMax: 30000,
    status: "Available",
    imageUrl: beagleImg,
    featured: true,
    description: "Playful and curious, loves to sniff around!"
  },
  {
    id: 2,
    name: "Snowball",
    breed: "Persian Cat",
    type: "cat",
    ageWeeks: 10,
    gender: "Female",
    priceMin: 15000,
    priceMax: 20000,
    status: "Available",
    imageUrl: kittenImg,
    featured: true,
    description: "Super fluffy and calm. Loves naps."
  },
  {
    id: 3,
    name: "Goldie",
    breed: "Golden Retriever",
    type: "dog",
    ageWeeks: 9,
    gender: "Female",
    priceMin: 30000,
    priceMax: 35000,
    status: "Available",
    imageUrl: goldenImg,
    featured: true,
    description: "The perfect family dog. Always smiling!"
  },
  {
    id: 4,
    name: "Rocky",
    breed: "Shih Tzu",
    type: "dog",
    ageWeeks: 12,
    gender: "Male",
    priceMin: 18000,
    priceMax: 22000,
    status: "Available",
    imageUrl: beagleImg, // Placeholder re-use
    featured: false,
    description: "Hypoallergenic and great for apartments."
  },
  {
    id: 5,
    name: "Luna",
    breed: "Labrador",
    type: "dog",
    ageWeeks: 8,
    gender: "Female",
    priceMin: 20000,
    priceMax: 25000,
    status: "Available",
    imageUrl: goldenImg, // Placeholder re-use
    featured: false,
    description: "Energetic and loves water."
  },
  {
    id: 6,
    name: "Coco",
    breed: "Poodle",
    type: "dog",
    ageWeeks: 11,
    gender: "Male",
    priceMin: 28000,
    priceMax: 32000,
    status: "Reserved",
    imageUrl: beagleImg, // Placeholder re-use
    featured: false,
    description: "Smart and easy to train."
  }
];

export interface Product {
  id: number;
  name: string;
  category: 'Food' | 'Accessories' | 'Care';
  price: number;
  imageUrl: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Puppy Kibble",
    category: "Food",
    price: 2500,
    imageUrl: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=300&q=80",
    description: "High-protein food for growing pups."
  },
  {
    id: 2,
    name: "Squeaky Bone Toy",
    category: "Accessories",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=300&q=80",
    description: "Durable rubber toy for teething."
  },
  {
    id: 3,
    name: "Soft Plush Bed",
    category: "Accessories",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=300&q=80",
    description: "Cozy bed for sweet dreams."
  },
  {
    id: 4,
    name: "Organic Shampoo",
    category: "Care",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1585837575652-2c91f89db0e7?auto=format&fit=crop&w=300&q=80",
    description: "Gentle formula for sensitive skin."
  }
];

export const groomingServices = [
  { id: 1, name: "Bath & Blow Dry", price: "₹800 - ₹1500" },
  { id: 2, name: "Full Grooming", price: "₹1500 - ₹2500" },
  { id: 3, name: "Nail Trimming", price: "₹300" },
  { id: 4, name: "Tick & Flea Treatment", price: "₹1200" },
];

export interface Booking {
  id: number;
  name: string;
  type: 'Visit' | 'Grooming' | 'Enquiry' | 'Enquiry_Product' | string;
  detail: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | string;
  phone?: string;
}

export const bookings: Booking[] = [
  { id: 1, name: 'Rahul Kumar', type: 'Visit', detail: 'Beagle Puppy', time: 'Tomorrow, 10:00 AM', status: 'Pending', phone: '+91 98765 43210' },
  { id: 2, name: 'Priya Sharma', type: 'Grooming', detail: 'Bath & Blow Dry', time: 'Today, 2:00 PM', status: 'Confirmed', phone: '+91 98123 45678' },
  { id: 3, name: 'Amit Patel', type: 'Enquiry', detail: '3 Products', time: 'Yesterday', status: 'Completed', phone: '+91 90000 11122' },
];
