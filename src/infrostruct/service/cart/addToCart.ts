import { useQueryClient } from '@tanstack/vue-query';
import { sonnerNotifier } from '@/infrostruct/notifier/sonnerNotirier.ts';
import { getCartControllerGetCartQueryKey, useCartControllerAddToCart } from '@/api/cart/cart.ts';
import {
  addProductToCart,
  type AddProductToCartDependencies,
} from '@/domain/useCases/cart/addProductToCart.ts';
import type { CartData } from '@/domain/models';
import type { AddToCartDto } from '@/api/model';
import { mappToCartData } from '@/api/mappers';

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
      setCartQueryData: (userId: number, cb: (cartData: CartData) => CartData) => {
        queryClient.setQueryData(getCartControllerGetCartQueryKey({ userId }), cb);
      },
    },
    addProductToCartApi: async (data: { data: AddToCartDto }) =>
      mappToCartData(await mutateAsync(data)),
  };

  const add = (data: { data: AddToCartDto }) => addProductToCart(data, dependencies);

  return {
    add,
    isPending,
    data,
  };
}
