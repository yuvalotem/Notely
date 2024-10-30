import { PropsWithChildren } from 'react'
import { queryClient } from '../api'
import { QueryClientProvider } from '@tanstack/react-query'

export const AppQueryClientProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
