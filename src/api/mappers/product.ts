import type { CreateProductMutation } from '@/domain/useCases/product/createProduct';
import type { useProductControllerCreate } from '../products/products';

export function mapToCreateProductMutation(
  mutation: ReturnType<typeof useProductControllerCreate>,
): CreateProductMutation {
  return {
    ...mutation,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    reset: mutation.reset,
  } as CreateProductMutation;
}
