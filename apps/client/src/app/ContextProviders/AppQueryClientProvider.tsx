import { PropsWithChildren } from 'react'
import { queryClient } from '../api'
import { QueryClientProvider } from 'react-query'

export const AppQueryClientProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
