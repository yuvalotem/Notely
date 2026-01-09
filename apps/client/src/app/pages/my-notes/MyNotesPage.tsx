import { Skeleton } from '@mui/material'

import { QueryKeys, useQueryData } from '../../api'
import { Card } from '../../components'
import { PageBody, PageContainer, PageHeader } from '../../layout'
import { appRoutes } from '../../routes'
import { MyNotesPageActions } from './MyNotesPageActions'
import { Note } from './Note'
import { NoteProps } from './types'

function NoteSkeleton() {
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

function MyNotesPageSkeletons() {
  return (
    <>
      {new Array(3).fill('').map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <NoteSkeleton key={index} />
      ))}
    </>
  )
}

type NotesResponse = {
  notes: NoteProps[]
  totalCount: number
}
export default function MyNotesPage() {
  const { isFetching, isLoading, data } = useQueryData<NotesResponse>({
    url: 'notes',
    queryKey: [QueryKeys.Notes],
  })

  return (
    <PageContainer>
      <PageHeader
        actions={<MyNotesPageActions />}
        title={appRoutes.notes.title}
      />
      <PageBody className="flex flex-row h-fit gap-2">
        {isFetching || isLoading ? (
          <MyNotesPageSkeletons />
        ) : (
          data?.notes?.map((note) => <Note key={note.id} {...note} />)
        )}
      </PageBody>
    </PageContainer>
  )
}
