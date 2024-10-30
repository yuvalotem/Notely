import { Input } from '../../../components'
import { useBuilderContext } from '../BuilderContext'
import { ApplicationSelect } from './ApplicationSelect'

export const BuilderSettings = () => {
  const { name, setName } = useBuilderContext()
  return (
    <div className="p-4 flex flex-col gap-4 border-t-[1px]">
      <h1>Note Settings</h1>
      <ApplicationSelect />
      <h3>Name</h3>
      <Input onValueChange={setName} value={name} placeholder="Note Name" />
    </div>
  )
}
