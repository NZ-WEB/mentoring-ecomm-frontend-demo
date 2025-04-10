import { describe, it, vi, expect, beforeEach } from 'vitest';
import {
  updateCartQuantity,
  type UpdateCartQuantityDependencies,
  type UpdateCartQuantityDTO,
  type UpdateCartQuantityResponse,
} from './updateCartQuantity';

export const mockCartResponse: UpdateCartQuantityResponse = {
  id: 124,
  userId: 457,
  items: [],
  total: 0,
  itemsCount: 0,
};

describe('createProduct', () => {
  const mockNotify = vi.fn();
  const mockInvalidateCartQuery = vi.fn();
  const mockUpdateCartQuantityApi = vi.fn();

  let deps: UpdateCartQuantityDependencies;

  beforeEach(() => {
    vi.resetAllMocks();

    deps = {
      notifier: { notify: mockNotify },
      cartQueryManager: {
        setCartQueryData: vi.fn(),
        invalidateCartQuery: mockInvalidateCartQuery,
      },
      updateCartQuantityApi: mockUpdateCartQuantityApi,
    };
  });

  it('should call updateCartQuantity with correct data', async () => {
    const data: UpdateCartQuantityDTO = {
      cartId: 1,
      itemId: 1,
      quantity: 1,
    };

    mockUpdateCartQuantityApi.mockResolvedValueOnce(
      mockCartResponse as UpdateCartQuantityResponse,
    );

    await updateCartQuantity(data, deps);

    expect(mockUpdateCartQuantityApi).toHaveBeenCalledWith(data);
  });

  it('should invalidate cart queries if mutate was successful', async () => {
    const data: UpdateCartQuantityDTO = {
      cartId: 1,
      itemId: 1,
      quantity: 1,
    };

    mockUpdateCartQuantityApi.mockResolvedValueOnce(
      mockCartResponse as UpdateCartQuantityResponse,
    );

    await updateCartQuantity(data, deps);

    expect(mockInvalidateCartQuery).toHaveBeenCalledOnce();
  });

  it('should not invalidate cart queries if mutate was not successful', async () => {
    const data: UpdateCartQuantityDTO = {
      cartId: 1,
      itemId: 1,
      quantity: 1,
    };

    mockUpdateCartQuantityApi.mockRejectedValueOnce(new Error('Some fail'));

    await updateCartQuantity(data, deps);

    expect(mockInvalidateCartQuery).not.toHaveBeenCalledOnce();
  });

  it('should call notifier with error when cart queries was not mutate successfull', async () => {
    const data: UpdateCartQuantityDTO = {
      cartId: 1,
      itemId: 1,
      quantity: 1,
    };

    mockUpdateCartQuantityApi.mockRejectedValueOnce(new Error('Some fail'));

    await updateCartQuantity(data, deps);

    expect(mockNotify).toHaveBeenCalledOnce();
  });

  it('should not call notifier with error when cart queries was mutate successfull', async () => {
    const data: UpdateCartQuantityDTO = {
      cartId: 1,
      itemId: 1,
      quantity: 1,
    };

    mockUpdateCartQuantityApi.mockResolvedValueOnce(
      mockCartResponse as UpdateCartQuantityResponse,
    );

    await updateCartQuantity(data, deps);

    expect(mockNotify).not.toHaveBeenCalledOnce();
  });
});
