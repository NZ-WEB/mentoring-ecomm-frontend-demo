import { getErrorMessage, type CartData } from '@/domain/models';
import type { CartQueryManager, INotifier } from '@/domain/services';

export interface UpdateCartQuantityDTO {
  cartId: number;
  itemId: number;
  quantity: number;
}

export type UpdateCartQuantityResponse = CartData;

export type UpdateCartQuantityApiFn = (
  dto: UpdateCartQuantityDTO,
) => Promise<UpdateCartQuantityResponse>;

export interface UpdateCartQuantityDependencies {
  notifier: INotifier;
  cartQueryManager: CartQueryManager;
  updateCartQuantityApi: UpdateCartQuantityApiFn;
}

export async function updateCartQuantity(
  dto: UpdateCartQuantityDTO,
  deps: UpdateCartQuantityDependencies,
) {
  try {
    const res = await deps.updateCartQuantityApi(dto);
    deps.cartQueryManager.invalidateCartQuery(res.userId);
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    deps.notifier.notify(errorMessage);
  }
}
