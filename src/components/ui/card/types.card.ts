export interface CartData {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}
