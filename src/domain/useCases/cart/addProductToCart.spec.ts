import { describe, it, vi, expect, beforeEach } from 'vitest';
import { addProductToCart, type AddToCartDto } from './addProductToCart';
import type { AddProductToCartDependencies } from './addProductToCart';

describe('addProductToCart', () => {
  const mockNotify = vi.fn();
  const mockAddProductToCartApi = vi.fn();

  let deps: AddProductToCartDependencies;

  beforeEach(() => {
    vi.resetAllMocks();

    deps = {
      notifier: { notify: mockNotify },
      cartQueryManager: {
        invalidateCartQuery: vi.fn(),
        setCartQueryData: vi.fn(),
      },
      addProductToCartApi: mockAddProductToCartApi,
    };
  });

  it('should call addProductToCartApi with correct data', async () => {
    const data: AddToCartDto = {
      userId: 1,
      productId: 1,
      quantity: 1,
    };

    mockAddProductToCartApi.mockResolvedValueOnce({
      id: 1,
      ...data,
    });

    await addProductToCart({ data }, deps);

    expect(mockAddProductToCartApi).toHaveBeenCalledWith({ data });
  });

  it('should invalidate add to cart query after successful creation', async () => {
    const data: AddToCartDto = {
      userId: 1,
      productId: 2,
      quantity: 1,
    };

    mockAddProductToCartApi.mockResolvedValueOnce({
      id: 1,
      ...data,
    });

    await addProductToCart({ data }, deps);

    expect(deps.cartQueryManager.invalidateCartQuery).toHaveBeenCalled();
  });

  it('should notify with error message when addProductToCartApi fails', async () => {
    const error = new Error('Something went wrong');
    mockAddProductToCartApi.mockRejectedValueOnce(error);

    const data: AddToCartDto = {
      userId: 1,
      productId: 1,
      quantity: 1,
    };

    await addProductToCart({ data }, deps);

    expect(mockNotify).toHaveBeenCalledWith('Something went wrong');
  });

  it('should not invalidate add to cart query when addProductToCartApi fails', async () => {
    mockAddProductToCartApi.mockRejectedValueOnce(new Error('API failed'));

    const data: AddToCartDto = {
      userId: 1,
      productId: 1,
      quantity: 100,
    };

    await addProductToCart({ data }, deps);

    expect(deps.cartQueryManager.invalidateCartQuery).not.toHaveBeenCalled();
  });
});
