import type { Product } from './product';

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
};

export type CartData = {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  items?: CartItem[];
};
