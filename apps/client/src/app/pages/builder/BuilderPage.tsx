import { useParams } from 'react-router-dom'

import { QueryKeys, useQueryData } from '../../api'
import { NoteProps } from '../my-notes'
import { BuilderContextProvider } from './BuilderContext'
import { BuilderPageContent } from './BuilderPageContent'

export default function BuilderPage() {
  const { id } = useParams()

  const {
    isFetching,
    isLoading,
    data: note,
  } = useQueryData<NoteProps>({
    url: `notes/${id}`,
    queryKey: [QueryKeys.Note, ...(id ? [id] : [])],
    enabled: !!id,
  })

  return (
    <BuilderContextProvider noteAppId={note?.appId} noteName={note?.name}>
      <BuilderPageContent loading={isFetching || isLoading} note={note} />
    </BuilderContextProvider>
  )
}
