import { BuilderPageContent } from './BuilderPageContent'
import { BuilderContextProvider } from './BuilderContext'
import { useParams } from 'react-router-dom'
import { NoteProps } from '../my-notes'
import { QueryKeys, useQueryData } from '../../api'
import { Skeleton } from '@mui/material'

export const BuilderPage = () => {
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
    <BuilderContextProvider noteAppId={note?.appId}>
      <BuilderPageContent note={note} loading={isFetching || isLoading} />
    </BuilderContextProvider>
  )
}
