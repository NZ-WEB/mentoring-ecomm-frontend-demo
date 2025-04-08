import { type UseMutationReturnType } from '@tanstack/vue-query';
import { watch } from 'vue';
import type { ErrorType } from '@/domain/models';
import type { Product } from '@/domain/models/product';
import type { INotifier } from '@/domain/services/notifier';
import type { ProductsQueryManager } from '@/domain/services/queries';

export type CreateProductMutation = UseMutationReturnType<
  Product,
  ErrorType,
  { data: ProductDTO },
  Product
>;

export interface CreateProductProviders {
  notifier: INotifier;
  createProductMutation: CreateProductMutation;
  productsQueryManager: ProductsQueryManager;
}

export type ProductDTO = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category?: string;
};
export function useCreateProduct(providers: CreateProductProviders) {
  const { notifier, createProductMutation, productsQueryManager } = providers;

  watch(
    () => createProductMutation.error.value,
    (newError) => {
      if (newError) {
        notifier.notify(newError.message);
      }
    },
  );

  watch(
    () => createProductMutation.data.value,
    () => {
      productsQueryManager.invalidateProductsQuery();
    },
  );

  return {
    create: createProductMutation.mutate,
    isPending: createProductMutation.isPending,
    response: createProductMutation.data,
  };
}
