import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { appRoutes } from '../../routes'
import { MyNotesPageActions } from './MyNotesPageActions'
import { Note, NoteProps } from './Note'
import { QueryKeys, useQueryData } from '../../api'

export const MyNotesPage = () => {
  const {
    isFetching,
    isLoading,
    data: notes,
  } = useQueryData<NoteProps[]>({
    url: 'notes/all',
    queryKey: [QueryKeys.Notes],
  })

  if (isFetching || isLoading) {
    return <MyNotesPageSkeletons />
  }

  return (
    <div className="w-full h-full">
      <PageHeader
        title={appRoutes.home.title}
        actions={<MyNotesPageActions />}
      />
      <PageBody className="flex flex-row h-fit gap-2">
        {notes?.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </PageBody>
    </div>
  )
}

const MyNotesPageSkeletons = () => {
  return <div className="w-full h-full">Loading...</div>
}
