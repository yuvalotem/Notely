import { useQuery, useMutation, QueryClient } from 'react-query'
import { Delete, Get, Post, Put, RequestParams } from '../requests'
import { useHandleApiRequestError } from '../helpers'
import { QueryKeys } from './consts'

export type QueryDataParams = {
  url: string
  queryKey: (QueryKeys | string)[]
  headers?: Record<string, string | number | string[]>
  onError?: () => void
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
}: QueryDataParams) => {
  const handleApiRequestError = useHandleApiRequestError(onError)
  return useQuery<T>({
    queryKey,
    queryFn: () => Get({ url, headers }),
    onError: handleApiRequestError,
  })
}

export type RawMutationParams = QueryDataParams & {
  onSuccess?: () => void
  apiFunction: <T>(params: RequestParams) => Promise<T>
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
}: RawMutationParams) => {
  const handleApiRequestError = useHandleApiRequestError(onError)
  return useMutation<T, E, P>({
    mutationFn: (requestParams) =>
      apiFunction({ url, ...params, ...(requestParams ?? {}) }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey })
      onSuccess?.()
    },
    onError: handleApiRequestError,
  })
}

type MutationParams = Omit<RawMutationParams, 'apiFunction'>

/**
 * use Post request
 * @param url - api url
 * @param queryKey - array of query keys to cache the data
 * @param params - request params
 * @returns
 * @see https://react-query.tanstack.com/reference/useMutation
 */
export const usePostMutation = <T, E>(params: MutationParams) =>
  useRawMutation({ ...params, apiFunction: Post })

/**
 * use Post request
 * @param url - api url
 * @param queryKey - array of query keys to cache the data
 * @param params - request params
 * @returns
 * @see https://react-query.tanstack.com/reference/useMutation
 */
export const usePutMutation = <T, E>(params: MutationParams) =>
  useRawMutation({ ...params, apiFunction: Put })

/**
 * use Post request
 * @param url - api url
 * @param queryKey - array of query keys to cache the data
 * @param params - request params
 * @returns
 * @see https://react-query.tanstack.com/reference/useMutation
 */
export const useDeleteMutation = <T = void, E = unknown, P = void>(
  params: MutationParams
) => useRawMutation<T, E, P>({ ...params, apiFunction: Delete })
