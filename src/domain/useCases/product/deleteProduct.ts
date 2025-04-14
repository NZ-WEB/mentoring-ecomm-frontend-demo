import type { INotifier } from '@/domain/services/notifier';
import type { ProductsQueryManager } from '@/domain/services/queries';
import { getErrorMessage } from '@/domain/models';
import type { ProductResponseDto } from '@/api/model';

export type DeleteProductDTO = {
  id: number;
};

export interface DeleteProductDependencies {
  notifier: INotifier;
  productsQueryManager: ProductsQueryManager;
  deleteProductApi: (data: DeleteProductDTO) => Promise<ProductResponseDto>;
}

export const deleteProduct = async (data: DeleteProductDTO, deps: DeleteProductDependencies) => {
  try {
    await deps.deleteProductApi(data);
    deps.productsQueryManager.invalidateProductsQuery();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    deps.notifier.notify(errorMessage);
  }
};
