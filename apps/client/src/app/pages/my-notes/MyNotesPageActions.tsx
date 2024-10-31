import { useNavigate } from 'react-router-dom'

import { Button } from '../../components'
import { appRoutes } from '../../routes'

export function MyNotesPageActions() {
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={() => navigate(appRoutes.createNote.path)}>
        Create new note
      </Button>
    </div>
  )
}
