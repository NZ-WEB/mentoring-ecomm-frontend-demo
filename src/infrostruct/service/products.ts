import {
  useCreateProduct,
  type CreateProductProviders,
} from '@/domain/useCases/product/createProduct';
import { useQueryClient } from '@tanstack/vue-query';
import { sonnerNotifier } from '../notifier/sonnerNotirier';
import {
  getProductControllerFindAllQueryKey,
  getProductControllerFindOneQueryKey,
  useProductControllerCreate,
} from '@/api/products/products';
import type { Product } from '@/domain/models/product';
import { mapToCreateProductMutation } from '@/api/mappers';

export function useCreateProductWithProviders() {
  const queryClient = useQueryClient();

  const providers: CreateProductProviders = {
    notifier: sonnerNotifier,
    productsQueryManager: {
      invalidateProductQuery: (pId: number) =>
        queryClient.invalidateQueries({
          queryKey: getProductControllerFindOneQueryKey(pId),
        }),
      invalidateProductsQuery: () =>
        queryClient.invalidateQueries({
          queryKey: getProductControllerFindAllQueryKey(),
        }),
      setProductQueryData: (
        id: number,
        cb: (productData: Product) => Product,
      ) => {
        queryClient.setQueryData(getProductControllerFindOneQueryKey(id), cb);
      },
      setProductsQueryData: (cb: (productData: Product[]) => Product[]) => {
        queryClient.setQueryData(getProductControllerFindAllQueryKey(), cb);
      },
    },
    createProductMutation: mapToCreateProductMutation(
      useProductControllerCreate(),
    ),
  };

  return useCreateProduct(providers);
}
