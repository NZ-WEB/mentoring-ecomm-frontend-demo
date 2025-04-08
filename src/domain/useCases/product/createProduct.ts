import type { Product } from "@/domain/models/product";
import type { INotifier } from "@/domain/services/notifier";
import type { ProductsQueryManager } from "@/domain/services/queries";
import { getErrorMessage } from "@/domain/models";

export type ProductDTO = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category?: string;
};

export interface CreateProductDependencies {
  notifier: INotifier;
  productsQueryManager: ProductsQueryManager;
  createProductApi: (data: { data: ProductDTO }) => Promise<Product>;
}

export const createProduct = async (
  data: { data: ProductDTO },
  deps: CreateProductDependencies,
) => {
  try {
    await deps.createProductApi(data);
    deps.productsQueryManager.invalidateProductsQuery();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    deps.notifier.notify(errorMessage);
  }
};
