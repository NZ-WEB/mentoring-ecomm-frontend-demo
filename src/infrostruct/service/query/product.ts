import { useProductControllerFindAll } from '@/api/products/products.ts';

export const productQueries = {
  getProductList: useProductControllerFindAll,
};
