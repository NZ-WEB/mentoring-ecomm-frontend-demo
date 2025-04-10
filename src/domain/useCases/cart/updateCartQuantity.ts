import { getErrorMessage } from '@/domain/models';
import type { CartQueryManager, INotifier } from '@/domain/services';

export interface UpdateCartQuantityDTO {
  cartId: number;
  itemId: number;
  quantity: number;
}

export type CartItemDtoProduct = { [key: string]: unknown };
export interface CartItemDto {
  id: number;
  productId: number;
  quantity: number;
  product: CartItemDtoProduct;
}
export interface UpdateCartQuantityResponse {
  id: number;
  userId: number;
  items: CartItemDto[];
  total: number;
  itemsCount: number;
}

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
