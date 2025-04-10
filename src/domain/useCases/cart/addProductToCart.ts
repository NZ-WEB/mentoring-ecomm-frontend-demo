import { getErrorMessage, type CartData } from '@/domain/models';
import type { INotifier } from '@/domain/services/notifier';
import type { CartQueryManager } from '@/domain/services/queries';

export interface AddToCartDto {
  userId: number;
  productId: number;
  quantity?: number;
}

type AddToCartResponseDto = CartData;

export interface AddProductToCartDependencies {
  notifier: INotifier;
  cartQueryManager: CartQueryManager;
  addProductToCartApi: (data: { data: AddToCartDto }) => Promise<AddToCartResponseDto>;
}

export type CartItemDtoProduct = { [key: string]: unknown };

export interface CartItemDto {
  id: number;
  productId: number;
  quantity: number;
  product: CartItemDtoProduct;
}

export const addProductToCart = async (
  data: { data: AddToCartDto },
  deps: AddProductToCartDependencies,
) => {
  try {
    const result = await deps.addProductToCartApi(data);
    deps.cartQueryManager.invalidateCartQuery(result.userId);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    deps.notifier.notify(errorMessage);
  }
};
