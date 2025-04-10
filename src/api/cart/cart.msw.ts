/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Cats example
 * The cats API description
 * OpenAPI spec version: 1.0
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, delay, http } from 'msw';

import type { CartResponseDto } from '.././model';

export const getCartControllerGetCartResponseMock = (
  overrideResponse: Partial<CartResponseDto> = {},
): CartResponseDto => ({
  id: faker.number.int({ min: undefined, max: undefined }),
  userId: faker.number.int({ min: undefined, max: undefined }),
  items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    productId: faker.number.int({ min: undefined, max: undefined }),
    quantity: faker.number.int({ min: undefined, max: undefined }),
    product: {},
  })),
  total: faker.number.int({ min: undefined, max: undefined }),
  itemsCount: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
});

export const getCartControllerAddToCartResponseMock = (
  overrideResponse: Partial<CartResponseDto> = {},
): CartResponseDto => ({
  id: faker.number.int({ min: undefined, max: undefined }),
  userId: faker.number.int({ min: undefined, max: undefined }),
  items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    productId: faker.number.int({ min: undefined, max: undefined }),
    quantity: faker.number.int({ min: undefined, max: undefined }),
    product: {},
  })),
  total: faker.number.int({ min: undefined, max: undefined }),
  itemsCount: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
});

export const getCartControllerUpdateCartItemResponseMock = (
  overrideResponse: Partial<CartResponseDto> = {},
): CartResponseDto => ({
  id: faker.number.int({ min: undefined, max: undefined }),
  userId: faker.number.int({ min: undefined, max: undefined }),
  items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    productId: faker.number.int({ min: undefined, max: undefined }),
    quantity: faker.number.int({ min: undefined, max: undefined }),
    product: {},
  })),
  total: faker.number.int({ min: undefined, max: undefined }),
  itemsCount: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
});

export const getCartControllerRemoveFromCartResponseMock = (
  overrideResponse: Partial<CartResponseDto> = {},
): CartResponseDto => ({
  id: faker.number.int({ min: undefined, max: undefined }),
  userId: faker.number.int({ min: undefined, max: undefined }),
  items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    productId: faker.number.int({ min: undefined, max: undefined }),
    quantity: faker.number.int({ min: undefined, max: undefined }),
    product: {},
  })),
  total: faker.number.int({ min: undefined, max: undefined }),
  itemsCount: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
});

export const getCartControllerClearCartResponseMock = (
  overrideResponse: Partial<CartResponseDto> = {},
): CartResponseDto => ({
  id: faker.number.int({ min: undefined, max: undefined }),
  userId: faker.number.int({ min: undefined, max: undefined }),
  items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    productId: faker.number.int({ min: undefined, max: undefined }),
    quantity: faker.number.int({ min: undefined, max: undefined }),
    product: {},
  })),
  total: faker.number.int({ min: undefined, max: undefined }),
  itemsCount: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
});

export const getCartControllerGetCartMockHandler = (
  overrideResponse?:
    | CartResponseDto
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<CartResponseDto> | CartResponseDto),
) => {
  return http.get('*/cart', async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCartControllerGetCartResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  });
};

export const getCartControllerAddToCartMockHandler = (
  overrideResponse?:
    | CartResponseDto
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<CartResponseDto> | CartResponseDto),
) => {
  return http.post('*/cart/add', async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCartControllerAddToCartResponseMock(),
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    );
  });
};

export const getCartControllerUpdateCartItemMockHandler = (
  overrideResponse?:
    | CartResponseDto
    | ((
        info: Parameters<Parameters<typeof http.patch>[1]>[0],
      ) => Promise<CartResponseDto> | CartResponseDto),
) => {
  return http.patch('*/cart/update', async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCartControllerUpdateCartItemResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  });
};

export const getCartControllerRemoveFromCartMockHandler = (
  overrideResponse?:
    | CartResponseDto
    | ((
        info: Parameters<Parameters<typeof http.delete>[1]>[0],
      ) => Promise<CartResponseDto> | CartResponseDto),
) => {
  return http.delete('*/cart/remove/:itemId', async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCartControllerRemoveFromCartResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  });
};

export const getCartControllerClearCartMockHandler = (
  overrideResponse?:
    | CartResponseDto
    | ((
        info: Parameters<Parameters<typeof http.delete>[1]>[0],
      ) => Promise<CartResponseDto> | CartResponseDto),
) => {
  return http.delete('*/cart/clear', async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getCartControllerClearCartResponseMock(),
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  });
};

export const getCartControllerGetCartTotalMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<unknown> | unknown),
) => {
  return http.get('*/cart/total', async (info) => {
    await delay(1000);
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 200 });
  });
};

export const getCartControllerGetCartItemsCountMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<unknown> | unknown),
) => {
  return http.get('*/cart/count', async (info) => {
    await delay(1000);
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 200 });
  });
};

export const getCartControllerIsProductInCartMockHandler = (
  overrideResponse?:
    | unknown
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<unknown> | unknown),
) => {
  return http.get('*/cart/check/:productId', async (info) => {
    await delay(1000);
    if (typeof overrideResponse === 'function') {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 200 });
  });
};
export const getCartMock = () => [
  getCartControllerGetCartMockHandler(),
  getCartControllerAddToCartMockHandler(),
  getCartControllerUpdateCartItemMockHandler(),
  getCartControllerRemoveFromCartMockHandler(),
  getCartControllerClearCartMockHandler(),
  getCartControllerGetCartTotalMockHandler(),
  getCartControllerGetCartItemsCountMockHandler(),
  getCartControllerIsProductInCartMockHandler(),
];
