import { Button } from '../../components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export type NoteProps = {
  component: string
  id: string
}
export const Note = ({ component, id }: NoteProps) => {
  const onDelete = () => {
    fetch(`http://localhost:8000/api/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'Referrer-Policy': 'no-referrer',
      },
    })
  }

  return (
    <div className="w-fit mt-2 border-2 p-2">
      <div className="flex flex-row justify-between mb-4 items-center">
        Note
        <Button onClick={onDelete} variant="danger" className="py-0 px-1">
          <DeleteOutlineIcon style={{ fontSize: '16px' }} />
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: component }} />
    </div>
  )
}
