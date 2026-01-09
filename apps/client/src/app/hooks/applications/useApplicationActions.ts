import { useMemo } from 'react'

import { QueryKeys, useDeleteMutation } from '../../api'
import { useSnackbarProvider } from '../../ContextProviders'

const generateApplicationMessage = ({
  name = 'was',
  action,
}: {
  name?: string
  action: string
}) => `Application ${name} ${action} successfully`

export const useApplicationActions = ({
  id,
  name,
}: {
  id?: string
  name?: string
}) => {
  const { showSnackbar } = useSnackbarProvider()

  const deleteApplication = useDeleteMutation({
    url: `applications/${id}`,
    queryKey: [QueryKeys.Applications],
    onSuccess: () => {
      showSnackbar({
        message: generateApplicationMessage({ name, action: 'deleted' }),
      })
    },
  }).mutate

  return useMemo(() => ({ deleteApplication }), [deleteApplication])
}
