import { FunctionComponent, PropsWithChildren } from 'react'

/**
 *
 * @param providers - array of providers to wrap the App
 * @returns Component that wraps with all providers in the given order
 */
export const buildAppProviders =
  (
    providers: FunctionComponent<PropsWithChildren>[]
  ): FunctionComponent<PropsWithChildren> =>
  ({ children }) =>
    providers.reduce((acc, provider) => provider({ children: acc }), children)
