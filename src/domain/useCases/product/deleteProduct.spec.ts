import { describe, it, vi, expect, beforeEach } from 'vitest';
import { deleteProduct, type DeleteProductDTO } from './deleteProduct';
import { type ProductDTO } from './createProduct';
import type { DeleteProductDependencies } from './deleteProduct';
import type { Product } from '@/domain/models/product';

describe('deleteProduct', () => {
  const mockNotify = vi.fn();
  const mockInvalidateProductsQuery = vi.fn();
  const mockDeleteProductApi = vi.fn();

  let deps: DeleteProductDependencies;

  beforeEach(() => {
    vi.resetAllMocks();

    deps = {
      notifier: { notify: mockNotify },
      productsQueryManager: {
        invalidateProductQuery: vi.fn(),
        invalidateProductsQuery: mockInvalidateProductsQuery,
        setProductQueryData: vi.fn(),
        setProductsQueryData: vi.fn(),
      },
      deleteProductApi: mockDeleteProductApi,
    };
  });

  it('1 should call createProductApi with correct data', async () => {
    const data: DeleteProductDTO = {
      productId: 1,
    };

    const responseData: ProductDTO = {
      name: 'Delete Test Product',
      price: 50,
      stock: 10,
    };

    mockDeleteProductApi.mockResolvedValueOnce({ id: 1, ...responseData } as Product);

    await deleteProduct({ data }, deps);

    expect(mockDeleteProductApi).toHaveBeenCalledWith({ data });
  });

  it('2 should synchronize the product list state after successful deletion', async () => {
    const data: DeleteProductDTO = {
      productId: 1,
    };

    const responseData: ProductDTO = {
      name: 'Delete Test Product',
      price: 50,
      stock: 10,
    };
    mockDeleteProductApi.mockResolvedValueOnce({ id: 1, ...responseData } as Product);

    await deleteProduct({ data }, deps);

    expect(deps.productsQueryManager.invalidateProductsQuery).toHaveBeenCalled();
  });

  it('3 should handle the successful deletion without errors', async () => {
    const data: DeleteProductDTO = {
      productId: 1,
    };

    const responseData: ProductDTO = {
      name: 'Delete Test Product',
      price: 50,
      stock: 10,
    };

    mockDeleteProductApi.mockResolvedValueOnce({ id: 1, ...responseData } as Product);

    await deleteProduct({ data }, deps);

    expect(mockNotify).not.toHaveBeenCalled();
  });

  it('4 should call Notifier with an error message when the API request fails', async () => {
    const error = new Error('Something went wrong');

    mockDeleteProductApi.mockRejectedValueOnce(error);

    const data: DeleteProductDTO = {
      productId: 1,
    };

    await deleteProduct({ data }, deps);

    expect(mockNotify).toHaveBeenCalledWith('Something went wrong');
  });

  it('5 should not synchronize the product list state when deletion fails', async () => {
    const error = new Error('Deletion failed');

    mockDeleteProductApi.mockRejectedValueOnce(error);

    const data: DeleteProductDTO = {
      productId: 1,
    };

    await deleteProduct({ data }, deps);

    expect(deps.productsQueryManager.invalidateProductsQuery).not.toHaveBeenCalled();
  });
});
