import type { Product } from './product';

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
};

export type CartData = {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  itemsCount: number;
};
