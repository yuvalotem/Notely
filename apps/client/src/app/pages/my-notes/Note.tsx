import parseStringfyHtmlToReactElement from 'html-react-parser'

import { Card } from '../../components'
import NoteMenu from './NoteMenu'
import { NoteProps } from './types'

export function Note(props: NoteProps) {
  const { component, name } = props

  return (
    <Card className="w-fit mt-2 border-[1px] p-2 max-h-80 overflow-scroll">
      <Card.Header className="flex flex-row justify-between mb-4 items-center min-w-40">
        Note: {name}
        <NoteMenu {...props} />
      </Card.Header>
      <Card.Body>
        {component && parseStringfyHtmlToReactElement(component)}
      </Card.Body>
    </Card>
  )
}
