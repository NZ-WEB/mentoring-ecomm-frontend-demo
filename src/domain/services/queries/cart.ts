import type { CartData } from '@/domain/models';

export interface CartQueryManager {
  setCartQueryData: (id: number, cb: (cartData: CartData) => CartData) => void;
  invalidateCartQuery: (id: number) => void;
}
