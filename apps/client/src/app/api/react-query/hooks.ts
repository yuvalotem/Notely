import {
  useQuery,
  useMutation,
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { Delete, Get, Post, Put, RequestParams } from '../requests'
import { useHandleApiRequestError } from '../helpers'
import { QueryKeys } from './consts'

type CommonReactQueryParams = {
  url: string
  queryKey: (QueryKeys | string)[]
  headers?: Record<string, string | number | string[]>
}

export type QueryDataParams<T> = Omit<UseQueryOptions<T>, 'queryKey'> &
  CommonReactQueryParams & {
    onError?: <E>(err: E) => void
  }

export const queryClient = new QueryClient()

/**
 * use get request
 * @param params.queryKey - array of query keys to cache the data
 * @param params.url - api full url
 * @param params.headers - request headers optional
 * @returns
 * @see https://react-query.tanstack.com/reference/useQuery
 */
export const useQueryData = <T>({
  queryKey,
  url,
  headers,
  onError,
  ...rest
}: QueryDataParams<T>) => {
  const handleApiRequestError = useHandleApiRequestError(onError)
  const response = useQuery<T>({
    queryKey,
    queryFn: () => Get({ url, headers }),
    ...rest,
  })
  if (response.isError) {
    handleApiRequestError(response.error)
  }
  return response
}

export type RawMutationParams<T, E, P> = Omit<
  UseMutationOptions<T, E, P>,
  'onError' | 'queryKey'
> &
  CommonReactQueryParams & {
    apiFunction: <T>(params: RequestParams) => Promise<T>
    onError?: (err: unknown) => void
    body?: Record<string, unknown>
  }
/**
 * use react query mutation with predefined api function
 */
export const useRawMutation = <T, E, P>({
  url,
  queryKey,
  onSuccess,
  onError,
  apiFunction,
  ...params
}: RawMutationParams<T, E, P>) => {
  const handleApiRequestError = useHandleApiRequestError(onError)
  return useMutation<T, E, P>({
    mutationFn: (requestParams) =>
      apiFunction({ url, ...params, ...(requestParams ?? {}) }),
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey })
      onSuccess?.(data, variables, context)
    },
    onError: handleApiRequestError,
  })
}

type MutationParams<T, E, P> = Omit<RawMutationParams<T, E, P>, 'apiFunction'>

/**
 * use Post request
 * @param url - api url
 * @param queryKey - array of query keys to cache the data
 * @param params - request params
 * @returns
 * @see https://react-query.tanstack.com/reference/useMutation
 */
export const usePostMutation = <T = void, E = unknown, P = void>(
  params: MutationParams<T, E, P>
) => useRawMutation({ ...params, apiFunction: Post })

/**
 * use Post request
 * @param url - api url
 * @param queryKey - array of query keys to cache the data
 * @param params - request params
 * @returns
 * @see https://react-query.tanstack.com/reference/useMutation
 */
export const usePutMutation = <T = void, E = unknown, P = void>(
  params: MutationParams<T, E, P>
) => useRawMutation({ ...params, apiFunction: Put })

/**
 * use Post request
 * @param url - api url
 * @param queryKey - array of query keys to cache the data
 * @param params - request params
 * @returns
 * @see https://react-query.tanstack.com/reference/useMutation
 */
export const useDeleteMutation = <T = void, E = unknown, P = void>(
  params: MutationParams<T, E, P>
) => useRawMutation<T, E, P>({ ...params, apiFunction: Delete })
