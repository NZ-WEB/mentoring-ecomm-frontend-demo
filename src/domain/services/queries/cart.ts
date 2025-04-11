import type { CartData } from '@/domain/models';

export interface CartQueryManager {
  setCartQueryData: (
    userId: number,
    cb: (cartData: CartData) => CartData,
  ) => void;
  invalidateCartQuery: (userId: number) => void;
}
