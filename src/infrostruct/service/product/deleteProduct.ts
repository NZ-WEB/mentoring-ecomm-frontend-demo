import { useQueryClient } from '@tanstack/vue-query';
import {
  getProductControllerFindAllQueryKey,
  getProductControllerFindOneQueryKey,
  useProductControllerRemove,
} from '@/api/products/products';
import type { Product } from '@/domain/models/product';
import { deleteProduct } from '@/domain/useCases/product/deleteProduct';
import type {
  DeleteProductDependencies,
  DeleteProductDTO,
} from '@/domain/useCases/product/deleteProduct';
import { sonnerNotifier } from '@/infrostruct/notifier/sonnerNotirier';

export function useDeleteProductAdapter() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, data } = useProductControllerRemove();

  const dependencies: DeleteProductDependencies = {
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
    deleteProductApi: async (data: DeleteProductDTO) => {
      const res = await mutateAsync(data);
      return res;
    },
  };

  const del = (data: DeleteProductDTO) => deleteProduct(data, dependencies);

  return {
    del,
    isPending,
    data,
  };
}
