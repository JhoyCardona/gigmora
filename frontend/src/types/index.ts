export interface User {
  id: string;
  email: string;
  name: string;
  isProvider: boolean;
  isClient: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  deliveryDays: number;
  images: string[];
  category: Category;
  provider: { id: string; name: string };
  avgRating: number | null;
  reviewCount: number;
}

export interface Order {
  id: string;
  status: string;
  createdAt: string;
  service: Service;
  client: { id: string; name: string };
}