import {
  updateCartQuantity,
  type UpdateCartQuantityDependencies,
  type UpdateCartQuantityDTO,
} from '@/domain/useCases/cart';
import { sonnerNotifier } from '../../notifier/sonnerNotirier.ts';
import { useQueryClient } from '@tanstack/vue-query';
import {
  getCartControllerGetCartQueryKey,
  useCartControllerUpdateCartItem,
} from '@/api/cart/cart.ts';
import type { CartData } from '@/domain/models';
import { mappToCartData } from '@/api/mappers';

export function useUpdateCartQuantityAdapter() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useCartControllerUpdateCartItem();

  const deps: UpdateCartQuantityDependencies = {
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
    updateCartQuantityApi: async (data: UpdateCartQuantityDTO) =>
      mappToCartData(
        await mutateAsync({ data } as {
          data: UpdateCartQuantityDTO;
        }),
      ),
  };

  const update = (dto: UpdateCartQuantityDTO) => updateCartQuantity(dto, deps);

  return {
    update,
  };
}
