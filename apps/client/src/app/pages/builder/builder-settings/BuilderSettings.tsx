import { Card, Input } from '../../../components'
import { useBuilderContext } from '../BuilderContext'
import { ApplicationSelect } from './ApplicationSelect'

export function BuilderSettings() {
  const { name, setName } = useBuilderContext()

  return (
    <Card>
      <Card.Header>General Settings</Card.Header>
      <Card.Body className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-ios-dark/60 ml-1"
            htmlFor="target-app-select"
          >
            Target Application
          </label>
          <ApplicationSelect id="target-app-select" />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-ios-dark/60 ml-1"
            htmlFor="note-name-input"
          >
            Note Name
          </label>
          <Input
            id="note-name-input"
            onValueChange={setName}
            placeholder="Enter note name..."
            value={name}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
