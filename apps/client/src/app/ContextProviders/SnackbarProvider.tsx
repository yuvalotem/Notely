import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type SnackbarPropsWithSeverity = SnackbarProps & {
  severity?: AlertProps['severity']
}

type SnackbarContextType = {
  showSnackbar: (props: Partial<SnackbarPropsWithSeverity>) => void
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
})

export function SnackbarProvider({ children }: PropsWithChildren) {
  const [snackbarProps, setSnackbarProps] = useState<
    Partial<SnackbarPropsWithSeverity>
  >({
    open: false,
  })

  const showSnackbar = useCallback(
    (props: Partial<SnackbarPropsWithSeverity>) => {
      setSnackbarProps({ ...props, open: true })
    },
    [setSnackbarProps]
  )

  const closeSnackbar = () => {
    setSnackbarProps({ open: false })
  }

  return (
    <SnackbarContext.Provider
      value={useMemo(() => ({ showSnackbar }), [showSnackbar])}
    >
      <Snackbar
        autoHideDuration={2000}
        onClose={closeSnackbar}
        {...snackbarProps}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarProps.severity ?? 'success'}
        >
          {snackbarProps.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbarProvider = () => useContext(SnackbarContext)
