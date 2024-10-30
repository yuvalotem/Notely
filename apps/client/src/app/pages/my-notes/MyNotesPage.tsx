import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { appRoutes } from '../../routes'
import { MyNotesPageActions } from './MyNotesPageActions'
import { Note } from './Note'
import { QueryKeys, useQueryData } from '../../api'
import { NoteProps } from './types'
import { Card } from '../../components'
import { Skeleton } from '@mui/material'

type NotesResponse = {
  notes: NoteProps[]
  totalCount: number
}
export const MyNotesPage = () => {
  const { isFetching, isLoading, data } = useQueryData<NotesResponse>({
    url: 'notes',
    queryKey: [QueryKeys.Notes],
  })

  return (
    <div className="w-full h-full">
      <PageHeader
        title={appRoutes.notes.title}
        actions={<MyNotesPageActions />}
      />
      <PageBody className="flex flex-row h-fit gap-2">
        {isFetching || isLoading ? (
          <MyNotesPageSkeletons />
        ) : (
          data?.notes?.map((note) => <Note key={note.id} {...note} />)
        )}
      </PageBody>
    </div>
  )
}

const MyNotesPageSkeletons = () => {
  return (
    <>
      {new Array(3).fill('').map((_, index) => (
        <NoteSkeleton key={index} />
      ))}
    </>
  )
}

const NoteSkeleton = () => {
  return (
    <Card className="w-fit mt-2 p-2 h-48 flex flex-col">
      <Card.Header className="flex flex-row justify-between mb-4 items-center min-w-40">
        <Skeleton className="w-20 " />
        <Skeleton className="w-6" />
      </Card.Header>
      <Card.Body className="h-full">
        <Skeleton className="w-3/5" sx={{ height: '100%' }} />
      </Card.Body>
    </Card>
  )
}
