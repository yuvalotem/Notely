import { useNavigate } from 'react-router-dom'

import { Button, Card } from '../../components'
import { PageBody, PageContainer } from '../../layout'
import { appRoutes } from '../../routes/routes'

const introducers = [
  {
    title: 'Release Management',
    description:
      'Empower your team to draft and publish beautifully formatted release notes. Streamline your workflow and deliver updates to your users without engineering bottlenecks.',
    path: appRoutes.notes.path,
    cta: 'Manage Notes',
  },
  {
    title: 'Application Ecosystem',
    description:
      'Connect and configure your entire product lineup. Seamlessly integrate Notely with your web and mobile platforms to provide a unified update experience.',
    path: appRoutes.applications.path,
    cta: 'Configure Apps',
  },
]

export default function OverviewPage() {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <PageBody className="flex flex-col h-full gap-10">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-ios-dark">
            The Future of Release Notes
          </h2>
          <p className="text-xl text-ios-dark/60 leading-relaxed">
            Notely simplifies how you communicate product changes. Manage,
            deploy, and scale your release documentation from a single,
            centralized command center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {introducers.map(({ title, description, path, cta }) => (
            <Card className="flex flex-col h-full" key={title}>
              <Card.Header className="h-fit py-6">
                <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
              </Card.Header>
              <Card.Body className="flex flex-col justify-between h-full p-6 gap-8">
                <span className="text-lg text-ios-dark/70 leading-relaxed font-normal">
                  {description}
                </span>
                <Button
                  className="w-fit px-8 py-3 text-base shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate(path)}
                  variant="primary"
                >
                  {cta}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </PageBody>
    </PageContainer>
  )
}
