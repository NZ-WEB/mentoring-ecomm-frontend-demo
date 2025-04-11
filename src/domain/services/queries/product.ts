import type { Product } from '@/domain/models/product';

export interface ProductsQueryManager {
  setProductsQueryData: (cb: (productData: Product[]) => Product[]) => void;
  setProductQueryData: (id: number, cb: (productData: Product) => Product) => void;
  invalidateProductsQuery: () => void;
  invalidateProductQuery: (id: number) => void;
}
