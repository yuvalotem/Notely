import { Button, Card } from '../../components'
import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { appRoutes } from '../../routes/routes'
import { useNavigate } from 'react-router-dom'

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

export const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full">
      <PageHeader title={appRoutes.home.title} />
      <PageBody className="flex flex-col h-full gap-2">
        Welcome to Notely
        <div className="grid grid-cols-2 gap-2">
          {introducers.map(({ title, description, path }) => (
            <Card key={title} className="flex flex-col">
              <Card.Header className="h-fit">{title}</Card.Header>
              <Card.Body className="flex flex-col justify-between h-full">
                <span>{description}</span>
                <Button
                  onClick={() => navigate(path)}
                  className="w-fit self-end"
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
