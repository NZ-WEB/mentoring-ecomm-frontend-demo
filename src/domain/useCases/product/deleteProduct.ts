import type { Product } from '@/domain/models/product';
import type { INotifier } from '@/domain/services/notifier';
import type { ProductsQueryManager } from '@/domain/services/queries';
import { getErrorMessage } from '@/domain/models';

export type DeleteProductDTO = {
  productId: number;
};

export interface DeleteProductDependencies {
  notifier: INotifier;
  productsQueryManager: ProductsQueryManager;
  deleteProductApi: (data: { data: DeleteProductDTO }) => Promise<Product>;
}

export const deleteProduct = async (
  data: { data: DeleteProductDTO },
  deps: DeleteProductDependencies,
) => {
  try {
    await deps.deleteProductApi(data);
    deps.productsQueryManager.invalidateProductsQuery();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    deps.notifier.notify(errorMessage);
  }
};
