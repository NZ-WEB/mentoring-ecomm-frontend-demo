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
  CreateProductDto,
  ProductControllerFindAllParams,
  ProductListResponseDto,
  ProductResponseDto,
  UpdateProductDto,
} from '.././model';

import { customInstance } from '.././custom-instance';
import type { ErrorType, BodyType } from '.././custom-instance';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * Creates a new product with the provided data
 * @summary Create a new product
 */
export const productControllerCreate = (
  createProductDto: MaybeRef<CreateProductDto>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  createProductDto = unref(createProductDto);

  return customInstance<ProductResponseDto>(
    {
      url: `/products`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createProductDto,
      signal,
    },
    options,
  );
};

export const getProductControllerCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof productControllerCreate>>,
    TError,
    { data: BodyType<CreateProductDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof productControllerCreate>>,
  TError,
  { data: BodyType<CreateProductDto> },
  TContext
> => {
  const mutationKey = ['productControllerCreate'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof productControllerCreate>>,
    { data: BodyType<CreateProductDto> }
  > = (props) => {
    const { data } = props ?? {};

    return productControllerCreate(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ProductControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof productControllerCreate>>
>;
export type ProductControllerCreateMutationBody = BodyType<CreateProductDto>;
export type ProductControllerCreateMutationError = ErrorType<unknown>;

/**
 * @summary Create a new product
 */
export const useProductControllerCreate = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof productControllerCreate>>,
      TError,
      { data: BodyType<CreateProductDto> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof productControllerCreate>>,
  TError,
  { data: BodyType<CreateProductDto> },
  TContext
> => {
  const mutationOptions = getProductControllerCreateMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Returns a list of products with pagination and filtering options
 * @summary Get all products
 */
export const productControllerFindAll = (
  params?: MaybeRef<ProductControllerFindAllParams>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  params = unref(params);

  return customInstance<ProductListResponseDto>(
    { url: `/products`, method: 'GET', params: unref(params), signal },
    options,
  );
};

export const getProductControllerFindAllQueryKey = (
  params?: MaybeRef<ProductControllerFindAllParams>,
) => {
  return ['products', ...(params ? [params] : [])] as const;
};

export const getProductControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof productControllerFindAll>>,
  TError = ErrorType<unknown>,
>(
  params?: MaybeRef<ProductControllerFindAllParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof productControllerFindAll>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getProductControllerFindAllQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productControllerFindAll>>> = ({
    signal,
  }) => productControllerFindAll(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof productControllerFindAll>>,
    TError,
    TData
  >;
};

export type ProductControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof productControllerFindAll>>
>;
export type ProductControllerFindAllQueryError = ErrorType<unknown>;

/**
 * @summary Get all products
 */

export function useProductControllerFindAll<
  TData = Awaited<ReturnType<typeof productControllerFindAll>>,
  TError = ErrorType<unknown>,
>(
  params?: MaybeRef<ProductControllerFindAllParams>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof productControllerFindAll>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getProductControllerFindAllQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return query;
}

/**
 * Returns a single product by its ID
 * @summary Get product by ID
 */
export const productControllerFindOne = (
  id: MaybeRef<number>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  id = unref(id);

  return customInstance<ProductResponseDto>(
    { url: `/products/${id}`, method: 'GET', signal },
    options,
  );
};

export const getProductControllerFindOneQueryKey = (id: MaybeRef<number>) => {
  return ['products', id] as const;
};

export const getProductControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof productControllerFindOne>>,
  TError = ErrorType<unknown>,
>(
  id: MaybeRef<number>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof productControllerFindOne>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getProductControllerFindOneQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productControllerFindOne>>> = ({
    signal,
  }) => productControllerFindOne(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!unref(id)),
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof productControllerFindOne>>, TError, TData>;
};

export type ProductControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof productControllerFindOne>>
>;
export type ProductControllerFindOneQueryError = ErrorType<unknown>;

/**
 * @summary Get product by ID
 */

export function useProductControllerFindOne<
  TData = Awaited<ReturnType<typeof productControllerFindOne>>,
  TError = ErrorType<unknown>,
>(
  id: MaybeRef<number>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof productControllerFindOne>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getProductControllerFindOneQueryOptions(id, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return query;
}

/**
 * Updates an existing product with the provided data
 * @summary Update product
 */
export const productControllerUpdate = (
  id: MaybeRef<number>,
  updateProductDto: MaybeRef<UpdateProductDto>,
  options?: SecondParameter<typeof customInstance>,
) => {
  id = unref(id);
  updateProductDto = unref(updateProductDto);

  return customInstance<ProductResponseDto>(
    {
      url: `/products/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: updateProductDto,
    },
    options,
  );
};

export const getProductControllerUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof productControllerUpdate>>,
    TError,
    { id: number; data: BodyType<UpdateProductDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof productControllerUpdate>>,
  TError,
  { id: number; data: BodyType<UpdateProductDto> },
  TContext
> => {
  const mutationKey = ['productControllerUpdate'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof productControllerUpdate>>,
    { id: number; data: BodyType<UpdateProductDto> }
  > = (props) => {
    const { id, data } = props ?? {};

    return productControllerUpdate(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ProductControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof productControllerUpdate>>
>;
export type ProductControllerUpdateMutationBody = BodyType<UpdateProductDto>;
export type ProductControllerUpdateMutationError = ErrorType<unknown>;

/**
 * @summary Update product
 */
export const useProductControllerUpdate = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof productControllerUpdate>>,
      TError,
      { id: number; data: BodyType<UpdateProductDto> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof productControllerUpdate>>,
  TError,
  { id: number; data: BodyType<UpdateProductDto> },
  TContext
> => {
  const mutationOptions = getProductControllerUpdateMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Deletes a product by its ID
 * @summary Delete product
 */
export const productControllerRemove = (
  id: MaybeRef<number>,
  options?: SecondParameter<typeof customInstance>,
) => {
  id = unref(id);

  return customInstance<ProductResponseDto>({ url: `/products/${id}`, method: 'DELETE' }, options);
};

export const getProductControllerRemoveMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof productControllerRemove>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof productControllerRemove>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['productControllerRemove'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof productControllerRemove>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return productControllerRemove(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ProductControllerRemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof productControllerRemove>>
>;

export type ProductControllerRemoveMutationError = ErrorType<unknown>;

/**
 * @summary Delete product
 */
export const useProductControllerRemove = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof productControllerRemove>>,
      TError,
      { id: number },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationReturnType<
  Awaited<ReturnType<typeof productControllerRemove>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getProductControllerRemoveMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Searches products by name or description
 * @summary Search products
 */
export const productControllerSearch = (
  query: MaybeRef<string>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  query = unref(query);

  return customInstance<ProductListResponseDto>(
    { url: `/products/search/${query}`, method: 'GET', signal },
    options,
  );
};

export const getProductControllerSearchQueryKey = (query: MaybeRef<string>) => {
  return ['products', 'search', query] as const;
};

export const getProductControllerSearchQueryOptions = <
  TData = Awaited<ReturnType<typeof productControllerSearch>>,
  TError = ErrorType<unknown>,
>(
  query: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof productControllerSearch>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = getProductControllerSearchQueryKey(query);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productControllerSearch>>> = ({
    signal,
  }) => productControllerSearch(query, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: computed(() => !!unref(query)),
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof productControllerSearch>>, TError, TData>;
};

export type ProductControllerSearchQueryResult = NonNullable<
  Awaited<ReturnType<typeof productControllerSearch>>
>;
export type ProductControllerSearchQueryError = ErrorType<unknown>;

/**
 * @summary Search products
 */

export function useProductControllerSearch<
  TData = Awaited<ReturnType<typeof productControllerSearch>>,
  TError = ErrorType<unknown>,
>(
  query: MaybeRef<string>,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof productControllerSearch>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryReturnType<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getProductControllerSearchQueryOptions(query, options);

  const _query = useQuery(queryOptions, queryClient) as UseQueryReturnType<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  _query.queryKey = unref(queryOptions).queryKey as DataTag<QueryKey, TData, TError>;

  return _query;
}
