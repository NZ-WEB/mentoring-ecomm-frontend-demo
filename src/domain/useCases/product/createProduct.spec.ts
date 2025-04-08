import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createProduct, type ProductDTO } from './createProduct';
import type { CreateProductDependencies } from './createProduct';
import type { Product } from '@/domain/models/product';

describe('createProduct', () => {
  const mockNotify = vi.fn();
  const mockInvalidateProductsQuery = vi.fn();
  const mockCreateProductApi = vi.fn();

  let deps: CreateProductDependencies;

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
      createProductApi: mockCreateProductApi,
    };
  });

  it('should call createProductApi with correct data', async () => {
    const data: ProductDTO = {
      name: 'Test Product',
      price: 50,
      stock: 10,
    };

    mockCreateProductApi.mockResolvedValueOnce({ id: 1, ...data } as Product);

    await createProduct({ data }, deps);

    expect(mockCreateProductApi).toHaveBeenCalledWith({ data });
  });

  it('should invalidate products query after successful creation', async () => {
    const data: ProductDTO = {
      name: 'Product',
      price: 100,
      stock: 1,
    };

    mockCreateProductApi.mockResolvedValueOnce({ id: 1, ...data } as Product);

    await createProduct({ data }, deps);

    expect(
      deps.productsQueryManager.invalidateProductsQuery,
    ).toHaveBeenCalled();
  });

  it('should notify with error message when createProductApi fails', async () => {
    const error = new Error('Something went wrong');
    mockCreateProductApi.mockRejectedValueOnce(error);

    const data: ProductDTO = {
      name: 'Error Product',
      price: 10,
      stock: 2,
    };

    await createProduct({ data }, deps);

    expect(mockNotify).toHaveBeenCalledWith('Something went wrong');
  });

  it('should not invalidate products query when createProductApi fails', async () => {
    mockCreateProductApi.mockRejectedValueOnce(new Error('API failed'));

    const data: ProductDTO = {
      name: 'Failing Product',
      price: 20,
      stock: 5,
    };

    await createProduct({ data }, deps);

    expect(mockInvalidateProductsQuery).not.toHaveBeenCalled();
  });
});
