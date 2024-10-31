import { useNavigate } from 'react-router-dom'

import { Button, Card } from '../../components'
import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { appRoutes } from '../../routes/routes'

const introducers = [
  {
    title: 'Explore notes',
    description:
      'Start by creating your custom notes and push them diretcly to your prodcution project without the need of dev teams',
    path: appRoutes.notes.path,
  },
  {
    title: 'Configure your application',
    description:
      'Create multiple applications and configure them to work with Notely',
    path: appRoutes.settings.path,
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full">
      <PageHeader title={appRoutes.home.title} />
      <PageBody className="flex flex-col h-full gap-2">
        Welcome to Notely
        <div className="grid grid-cols-2 gap-2">
          {introducers.map(({ title, description, path }) => (
            <Card className="flex flex-col" key={title}>
              <Card.Header className="h-fit">{title}</Card.Header>
              <Card.Body className="flex flex-col justify-between h-full">
                <span>{description}</span>
                <Button
                  className="w-fit self-end"
                  onClick={() => navigate(path)}
                >
                  Explore
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </PageBody>
    </div>
  )
}
