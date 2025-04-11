import { getErrorMessage } from "@/domain/models";
import type { INotifier } from "@/domain/services/notifier";
import type { CartQueryManager } from "@/domain/services/queries";

export interface AddToCartDto {
  userId: number;
  productId: number;
  quantity?: number;
}

export interface AddProductToCartDependencies {
  notifier: INotifier;
  cartQueryManager: CartQueryManager;
  addProductToCartApi: (data: {
    data: AddToCartDto;
  }) => Promise<CartResponseDto>;
}

export type CartItemDtoProduct = { [key: string]: unknown };

export interface CartItemDto {
  id: number;
  productId: number;
  quantity: number;
  product: CartItemDtoProduct;
}

export interface CartResponseDto {
  id: number;
  userId: number;
  items: CartItemDto[];
  total: number;
  itemsCount: number;
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
