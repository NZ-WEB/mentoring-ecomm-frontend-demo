/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Cats example
 * The cats API description
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from '@tanstack/vue-query';
import type {
  DataTag,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationReturnType,
  UseQueryOptions,
  UseQueryReturnType,
} from '@tanstack/vue-query';

import { computed, unref } from 'vue';
import type { MaybeRef } from 'vue';

import type {
  AddToCartDto,
  CartControllerClearCartParams,
  CartControllerGetCartItemsCountParams,
  CartControllerGetCartParams,
  CartControllerGetCartTotalParams,
  CartControllerIsProductInCartParams,
  CartControllerRemoveFromCartParams,
  CartResponseDto,
  UpdateCartItemDto,
} from '.././model';

import { customInstance } from '.././custom-instance';
import type { BodyType, ErrorType } from '.././custom-instance';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * Retrieves the current user cart with all items
 * @summary Get user cart
 */
export const cartControllerGetCart = (
  params: MaybeRef<CartControllerGetCartParams>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  params = unref(params);

  return customInstance<CartResponseDto>(
    { url: `/cart`, method: 'GET', params: unref(params), signal },
    options,
  );
};

export const getCartControllerGetCartQueryKey = (params: MaybeRef<CartControllerGetCartParams>) => {
  return ['cart', ...(params ? [params] : [])] as const;
};

export const getCartControllerGetCartQueryOptions = <
  TData = Awaited<ReturnType<typeof cartControllerGetCart>>,
  TError = ErrorType<unknown>,
>(
  params: MaybeRef<CartControllerGetCartParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerGetCart>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getCartControllerGetCartQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof cartControllerGetCart>>> = ({ signal }) =>
    cartControllerGetCart(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof cartControllerGetCart>>,
    TError,
    TData
  >;
};

export type CartControllerGetCartQueryResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerGetCart>>
>;
export type CartControllerGetCartQueryError = ErrorType<unknown>;

/**
 * @summary Get user cart
 */

export function useCartControllerGetCart<
  TData = Awaited<ReturnType<typeof cartControllerGetCart>>,
  TError = ErrorType<unknown>,
>(
  params: MaybeRef<CartControllerGetCartParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerGetCart>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getCartControllerGetCartQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return query;
}

/**
 * Adds a product to the user cart or increases quantity if already exists
 * @summary Add item to cart
 */
export const cartControllerAddToCart = (
  addToCartDto: MaybeRef<AddToCartDto>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  addToCartDto = unref(addToCartDto);

  return customInstance<CartResponseDto>(
    {
      url: `/cart/add`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: addToCartDto,
      signal,
    },
    options,
  );
};

export const getCartControllerAddToCartMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof cartControllerAddToCart>>,
    TError,
    { data: BodyType<AddToCartDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof cartControllerAddToCart>>,
  TError,
  { data: BodyType<AddToCartDto> },
  TContext
> => {
  const mutationKey = ['cartControllerAddToCart'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof cartControllerAddToCart>>,
    { data: BodyType<AddToCartDto> }
  > = (props) => {
    const { data } = props ?? {};

    return cartControllerAddToCart(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CartControllerAddToCartMutationResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerAddToCart>>
>;
export type CartControllerAddToCartMutationBody = BodyType<AddToCartDto>;
export type CartControllerAddToCartMutationError = ErrorType<void>;

/**
 * @summary Add item to cart
 */
export const useCartControllerAddToCart = <TError = ErrorType<void>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof cartControllerAddToCart>>,
      TError,
      { data: BodyType<AddToCartDto> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof cartControllerAddToCart>>,
  TError,
  { data: BodyType<AddToCartDto> },
  TContext
> => {
  const mutationOptions = getCartControllerAddToCartMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Updates the quantity of a specific item in the cart
 * @summary Update cart item
 */
export const cartControllerUpdateCartItem = (
  updateCartItemDto: MaybeRef<UpdateCartItemDto>,
  options?: SecondParameter<typeof customInstance>,
) => {
  updateCartItemDto = unref(updateCartItemDto);

  return customInstance<CartResponseDto>(
    {
      url: `/cart/update`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: updateCartItemDto,
    },
    options,
  );
};

export const getCartControllerUpdateCartItemMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof cartControllerUpdateCartItem>>,
    TError,
    { data: BodyType<UpdateCartItemDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof cartControllerUpdateCartItem>>,
  TError,
  { data: BodyType<UpdateCartItemDto> },
  TContext
> => {
  const mutationKey = ['cartControllerUpdateCartItem'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof cartControllerUpdateCartItem>>,
    { data: BodyType<UpdateCartItemDto> }
  > = (props) => {
    const { data } = props ?? {};

    return cartControllerUpdateCartItem(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CartControllerUpdateCartItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerUpdateCartItem>>
>;
export type CartControllerUpdateCartItemMutationBody = BodyType<UpdateCartItemDto>;
export type CartControllerUpdateCartItemMutationError = ErrorType<void>;

/**
 * @summary Update cart item
 */
export const useCartControllerUpdateCartItem = <TError = ErrorType<void>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof cartControllerUpdateCartItem>>,
      TError,
      { data: BodyType<UpdateCartItemDto> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof cartControllerUpdateCartItem>>,
  TError,
  { data: BodyType<UpdateCartItemDto> },
  TContext
> => {
  const mutationOptions = getCartControllerUpdateCartItemMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Removes a specific item from the cart
 * @summary Remove item from cart
 */
export const cartControllerRemoveFromCart = (
  itemId: MaybeRef<number>,
  params: MaybeRef<CartControllerRemoveFromCartParams>,
  options?: SecondParameter<typeof customInstance>,
) => {
  itemId = unref(itemId);
  params = unref(params);

  return customInstance<CartResponseDto>(
    { url: `/cart/remove/${itemId}`, method: 'DELETE', params: unref(params) },
    options,
  );
};

export const getCartControllerRemoveFromCartMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof cartControllerRemoveFromCart>>,
    TError,
    { itemId: number; params: CartControllerRemoveFromCartParams },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof cartControllerRemoveFromCart>>,
  TError,
  { itemId: number; params: CartControllerRemoveFromCartParams },
  TContext
> => {
  const mutationKey = ['cartControllerRemoveFromCart'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof cartControllerRemoveFromCart>>,
    { itemId: number; params: CartControllerRemoveFromCartParams }
  > = (props) => {
    const { itemId, params } = props ?? {};

    return cartControllerRemoveFromCart(itemId, params, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CartControllerRemoveFromCartMutationResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerRemoveFromCart>>
>;

export type CartControllerRemoveFromCartMutationError = ErrorType<void>;

/**
 * @summary Remove item from cart
 */
export const useCartControllerRemoveFromCart = <TError = ErrorType<void>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof cartControllerRemoveFromCart>>,
      TError,
      { itemId: number; params: CartControllerRemoveFromCartParams },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof cartControllerRemoveFromCart>>,
  TError,
  { itemId: number; params: CartControllerRemoveFromCartParams },
  TContext
> => {
  const mutationOptions = getCartControllerRemoveFromCartMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Removes all items from the user cart
 * @summary Clear cart
 */
export const cartControllerClearCart = (
  params: MaybeRef<CartControllerClearCartParams>,
  options?: SecondParameter<typeof customInstance>,
) => {
  params = unref(params);

  return customInstance<CartResponseDto>(
    { url: `/cart/clear`, method: 'DELETE', params: unref(params) },
    options,
  );
};

export const getCartControllerClearCartMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof cartControllerClearCart>>,
    TError,
    { params: CartControllerClearCartParams },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof cartControllerClearCart>>,
  TError,
  { params: CartControllerClearCartParams },
  TContext
> => {
  const mutationKey = ['cartControllerClearCart'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof cartControllerClearCart>>,
    { params: CartControllerClearCartParams }
  > = (props) => {
    const { params } = props ?? {};

    return cartControllerClearCart(params, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CartControllerClearCartMutationResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerClearCart>>
>;

export type CartControllerClearCartMutationError = ErrorType<unknown>;

/**
 * @summary Clear cart
 */
export const useCartControllerClearCart = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof cartControllerClearCart>>,
      TError,
      { params: CartControllerClearCartParams },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof cartControllerClearCart>>,
  TError,
  { params: CartControllerClearCartParams },
  TContext
> => {
  const mutationOptions = getCartControllerClearCartMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Calculates the total sum of all items in the cart
 * @summary Calculate cart total
 */
export const cartControllerGetCartTotal = (
  params: MaybeRef<CartControllerGetCartTotalParams>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  params = unref(params);

  return customInstance<unknown>(
    { url: `/cart/total`, method: 'GET', params: unref(params), signal },
    options,
  );
};

export const getCartControllerGetCartTotalQueryKey = (
  params: MaybeRef<CartControllerGetCartTotalParams>,
) => {
  return ['cart', 'total', ...(params ? [params] : [])] as const;
};

export const getCartControllerGetCartTotalQueryOptions = <
  TData = Awaited<ReturnType<typeof cartControllerGetCartTotal>>,
  TError = ErrorType<unknown>,
>(
  params: MaybeRef<CartControllerGetCartTotalParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerGetCartTotal>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getCartControllerGetCartTotalQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof cartControllerGetCartTotal>>> = ({
    signal,
  }) => cartControllerGetCartTotal(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof cartControllerGetCartTotal>>,
    TError,
    TData
  >;
};

export type CartControllerGetCartTotalQueryResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerGetCartTotal>>
>;
export type CartControllerGetCartTotalQueryError = ErrorType<unknown>;

/**
 * @summary Calculate cart total
 */

export function useCartControllerGetCartTotal<
  TData = Awaited<ReturnType<typeof cartControllerGetCartTotal>>,
  TError = ErrorType<unknown>,
>(
  params: MaybeRef<CartControllerGetCartTotalParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerGetCartTotal>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getCartControllerGetCartTotalQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return query;
}

/**
 * Returns the total number of items in the cart
 * @summary Get cart items count
 */
export const cartControllerGetCartItemsCount = (
  params: MaybeRef<CartControllerGetCartItemsCountParams>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  params = unref(params);

  return customInstance<unknown>(
    { url: `/cart/count`, method: 'GET', params: unref(params), signal },
    options,
  );
};

export const getCartControllerGetCartItemsCountQueryKey = (
  params: MaybeRef<CartControllerGetCartItemsCountParams>,
) => {
  return ['cart', 'count', ...(params ? [params] : [])] as const;
};

export const getCartControllerGetCartItemsCountQueryOptions = <
  TData = Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>,
  TError = ErrorType<unknown>,
>(
  params: MaybeRef<CartControllerGetCartItemsCountParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getCartControllerGetCartItemsCountQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>> = ({
    signal,
  }) => cartControllerGetCartItemsCount(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>,
    TError,
    TData
  >;
};

export type CartControllerGetCartItemsCountQueryResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>
>;
export type CartControllerGetCartItemsCountQueryError = ErrorType<unknown>;

/**
 * @summary Get cart items count
 */

export function useCartControllerGetCartItemsCount<
  TData = Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>,
  TError = ErrorType<unknown>,
>(
  params: MaybeRef<CartControllerGetCartItemsCountParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerGetCartItemsCount>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getCartControllerGetCartItemsCountQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return query;
}

/**
 * Checks if a specific product exists in the user cart
 * @summary Check if product is in cart
 */
export const cartControllerIsProductInCart = (
  productId: MaybeRef<number>,
  params: MaybeRef<CartControllerIsProductInCartParams>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  productId = unref(productId);
  params = unref(params);

  return customInstance<unknown>(
    {
      url: `/cart/check/${productId}`,
      method: 'GET',
      params: unref(params),
      signal,
    },
    options,
  );
};

export const getCartControllerIsProductInCartQueryKey = (
  productId: MaybeRef<number>,
  params: MaybeRef<CartControllerIsProductInCartParams>,
) => {
  return ['cart', 'check', productId, ...(params ? [params] : [])] as const;
};

export const getCartControllerIsProductInCartQueryOptions = <
  TData = Awaited<ReturnType<typeof cartControllerIsProductInCart>>,
  TError = ErrorType<unknown>,
>(
  productId: MaybeRef<number>,
  params: MaybeRef<CartControllerIsProductInCartParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerIsProductInCart>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getCartControllerIsProductInCartQueryKey(productId, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof cartControllerIsProductInCart>>> = ({
    signal,
  }) => cartControllerIsProductInCart(productId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!unref(productId)),
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof cartControllerIsProductInCart>>, TError, TData>;
};

export type CartControllerIsProductInCartQueryResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerIsProductInCart>>
>;
export type CartControllerIsProductInCartQueryError = ErrorType<unknown>;

/**
 * @summary Check if product is in cart
 */

export function useCartControllerIsProductInCart<
  TData = Awaited<ReturnType<typeof cartControllerIsProductInCart>>,
  TError = ErrorType<unknown>,
>(
  productId: MaybeRef<number>,
  params: MaybeRef<CartControllerIsProductInCartParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof cartControllerIsProductInCart>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getCartControllerIsProductInCartQueryOptions(productId, params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return query;
}
