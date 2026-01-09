import { Card, Input } from '../../../components'
import { useBuilderContext } from '../BuilderContext'
import { ApplicationSelect } from './ApplicationSelect'

export function BuilderSettings() {
  const { name, setName } = useBuilderContext()

  return (
    <Card>
      <Card.Header>General Settings</Card.Header>
      <Card.Body className="flex flex-col gap-6 p-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ios-dark/60 ml-1">
            Target Application
          </span>
          <ApplicationSelect id="target-app-select" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ios-dark/60 ml-1">
            Note Name
          </span>
          <Input
            id="note-name-input"
            onValueChange={setName}
            placeholder="Enter note name..."
            value={name}
          />
        </label>
      </Card.Body>
    </Card>
  )
}
