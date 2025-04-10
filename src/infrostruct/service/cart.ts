import { useQueryClient } from '@tanstack/vue-query';
import { sonnerNotifier } from '@/infrostruct/notifier/sonnerNotirier';
import {
  getCartControllerGetCartQueryKey,
  useCartControllerAddToCart,
} from '@/api/cart/cart';
import {
  addProductToCart,
  type AddProductToCartDependencies,
} from '@/domain/useCases/cart/addProductToCart';
import type { CartData } from '@/domain/models';
import type { AddToCartDto } from '@/api/model';

export function useAddProductToCartAdapter() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, data } = useCartControllerAddToCart();

  const dependencies: AddProductToCartDependencies = {
    notifier: sonnerNotifier,
    cartQueryManager: {
      invalidateCartQuery: (userId: number) => {
        queryClient.invalidateQueries({
          queryKey: getCartControllerGetCartQueryKey({ userId }),
        });
      },
      setCartQueryData: (
        userId: number,
        cb: (cartData: CartData) => CartData,
      ) => {
        queryClient.setQueryData(
          getCartControllerGetCartQueryKey({ userId }),
          cb,
        );
      },
    },
    addProductToCartApi: mutateAsync,
  };

  const add = (data: { data: AddToCartDto }) =>
    addProductToCart(data, dependencies);

  return {
    add,
    isPending,
    data,
  };
}
