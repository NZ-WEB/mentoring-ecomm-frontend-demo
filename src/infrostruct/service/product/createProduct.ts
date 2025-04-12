import { useQueryClient } from '@tanstack/vue-query';
import {
  getProductControllerFindAllQueryKey,
  getProductControllerFindOneQueryKey,
  useProductControllerCreate,
} from '@/api/products/products';
import type { Product } from '@/domain/models/product';
import { createProduct, type ProductDTO } from '@/domain/useCases/product/createProduct';
import type { CreateProductDependencies } from '@/domain/useCases/product/createProduct';
import { sonnerNotifier } from '@/infrostruct/notifier/sonnerNotirier';

export function useCreateProductAdapter() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, data } = useProductControllerCreate();

  const dependencies: CreateProductDependencies = {
    notifier: sonnerNotifier,
    productsQueryManager: {
      invalidateProductQuery: (productId: number) => {
        queryClient.invalidateQueries({
          queryKey: getProductControllerFindOneQueryKey(productId),
        });
      },
      invalidateProductsQuery: () => {
        queryClient.invalidateQueries({
          queryKey: getProductControllerFindAllQueryKey(),
        });
      },
      setProductQueryData: (id: number, cb: (productData: Product) => Product) => {
        queryClient.setQueryData(getProductControllerFindOneQueryKey(id), cb);
      },
      setProductsQueryData: (cb: (productData: Product[]) => Product[]) => {
        queryClient.setQueryData(getProductControllerFindAllQueryKey(), cb);
      },
    },
    createProductApi: mutateAsync,
  };

  const create = (data: { data: ProductDTO }) => createProduct(data, dependencies);

  return {
    create,
    isPending,
    data,
  };
}
