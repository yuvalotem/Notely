import { BuilderPageContent } from './BuilderPageContent'
import { BuilderContextProvider } from './BuilderContext'
import { useParams } from 'react-router-dom'
import { NoteProps } from '../my-notes/Note'
import { QueryKeys, useQueryData } from '../../api'

export const BuilderPage = () => {
  const { id } = useParams()
  const {
    isFetching,
    isLoading,
    data: note,
  } = useQueryData<NoteProps>({
    url: `notes/${id}`,
    queryKey: [QueryKeys.Note, ...(id ? [id] : [])],
  })

  if (isFetching || isLoading) {
    return <BuilderPageContentSkeleton />
  }

  return (
    <BuilderContextProvider>
      <BuilderPageContent note={note} />
    </BuilderContextProvider>
  )
}

const BuilderPageContentSkeleton = () => {
  return <div className="w-full h-full">Loading...</div>
}
