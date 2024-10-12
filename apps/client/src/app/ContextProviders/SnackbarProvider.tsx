import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type SnackbarPropsWithSeverity = SnackbarProps & {
  severity?: AlertProps['severity']
}

type SnackbarContextType = {
  showSnackbar: (props: Partial<SnackbarPropsWithSeverity>) => void
}
const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
})

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [snackbarProps, setSnackbarProps] = useState<
    Partial<SnackbarPropsWithSeverity>
  >({
    open: false,
  })

  const showSnackbar = (props: Partial<SnackbarPropsWithSeverity>) => {
    setSnackbarProps({ ...props, open: true })
  }
  const closeSnackbar = () => {
    setSnackbarProps({ open: false })
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
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
