import { useSnackbarProvider } from '../../ContextProviders'

export const useHandleApiRequestError = (callback?: <E>(error: E) => void) => {
  const { showSnackbar } = useSnackbarProvider()

  return (error: unknown) => {
    // eslint-disable-next-line no-console
    console.error(error)
    let message = 'Something went wrong'

    if (error instanceof Error) {
      message = error.message
    }

    showSnackbar({ message, severity: 'error' })
    callback?.(message)
  }
}
