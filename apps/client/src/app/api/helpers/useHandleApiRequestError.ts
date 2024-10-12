import { useSnackbarProvider } from '../../ContextProviders'

export const useHandleApiRequestError = (
  callback?: (error: string) => void
) => {
  const { showSnackbar } = useSnackbarProvider()

  return (error: unknown) => {
    console.error(error)
    let message = 'Something went wrong'
    if (error instanceof Error) {
      message = error.message
    }
    showSnackbar({ message, severity: 'error' })
    callback?.(message)
  }
}