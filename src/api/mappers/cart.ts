import type { CartData, Product } from '@/domain/models';
import type { CartResponseDto } from '../model';
import { APP_CONFIG } from '@/config';

export function mappToCartData(dto: CartResponseDto): CartData {
  return {
    ...dto,
    userId: APP_CONFIG.USER_ID,
    items: dto.items.map((item) => {
      return {
        ...item,
        product: item.product as Product,
      };
    }),
  };
}
