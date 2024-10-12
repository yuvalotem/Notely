import { Button } from '../../components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import parseStringfyHtmlToReactElement from 'html-react-parser'
import { QueryKeys, useDeleteMutation } from '../../api'
import { useSnackbarProvider } from '../../ContextProviders'

export type NoteProps = {
  component: string
  id: string
}
export const Note = ({ component, id }: NoteProps) => {
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarProvider()
  const { mutate: deleteNote } = useDeleteMutation({
    url: `notes/${id}`,
    queryKey: [QueryKeys.Notes],
    onSuccess: () => {
      showSnackbar({ message: 'Note deleted successfully' })
    },
  })

  return (
    <div className="w-fit mt-2 border-2 p-2 max-h-80 overflow-scroll">
      <div className="flex flex-row justify-between mb-4 items-center">
        Note
        <div>
          <MoreVertIcon
            color="action"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/note/${id}`)}
          />
          <Button
            onClick={() => deleteNote()}
            variant="danger"
            className="py-0 px-1"
          >
            <DeleteOutlineIcon style={{ fontSize: '16px' }} />
          </Button>
        </div>
      </div>
      {component && parseStringfyHtmlToReactElement(component)}
    </div>
  )
}
