import { APP_CONFIG } from '@/config';
import Axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: APP_CONFIG.API_URL,
});

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<E = Error> = AxiosError<E>;

export type BodyType<BodyData> = BodyData;
