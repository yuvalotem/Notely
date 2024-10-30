import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../../routes'
import { Button } from '../../components'

export const MyNotesPageActions = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={() => navigate(appRoutes.createNote.path)}>
        Create new note
      </Button>
    </div>
  )
}
