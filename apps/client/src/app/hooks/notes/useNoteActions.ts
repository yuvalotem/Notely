import { useNavigate } from 'react-router-dom'
import {
  QueryKeys,
  useDeleteMutation,
  usePostMutation,
  usePutMutation,
} from '../../api'
import { useSnackbarProvider } from '../../ContextProviders'
import { appRoutes } from '../../routes'
import { useMemo } from 'react'

type NotePayload = {
  body: Partial<{ component: string; appId: string; name: string }>
}
export const useNoteActions = ({
  id,
  name,
}: {
  id?: string
  name?: string
}) => {
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarProvider()
  const { mutate: createNote } = usePostMutation<void, unknown, NotePayload>({
    url: `notes`,
    queryKey: [QueryKeys.Notes],
    onSuccess: () => {
      navigate(appRoutes.notes.path)
    },
  })
  const { mutate: updateNote } = usePutMutation<void, unknown, NotePayload>({
    url: `notes/${id ?? ''}`,
    queryKey: [QueryKeys.Notes, QueryKeys.Note, ...(id ? [id] : [])],
    onSuccess: () => {
      showSnackbar({
        message: generateNoteMessage({ name, action: 'updated' }),
      })
    },
  })

  const deleteNote = useDeleteMutation({
    url: `notes/${id}`,
    queryKey: [QueryKeys.Notes],
    onSuccess: () => {
      showSnackbar({
        message: generateNoteMessage({ name, action: 'deleted' }),
      })
    },
  }).mutate

  const pushNote = usePostMutation({
    url: `notes/push`,
    body: { id },
    queryKey: [QueryKeys.Notes],
    onSuccess: () => {
      showSnackbar({
        message: generateNoteMessage({ name, action: 'published' }),
      })
    },
  }).mutate

  return useMemo(
    () => ({ createNote, updateNote, deleteNote, pushNote }),
    [createNote, updateNote, deleteNote, pushNote]
  )
}

const generateNoteMessage = ({
  name = 'was',
  action,
}: {
  name?: string
  action: string
}) => `Note ${name} ${action} successfully`
