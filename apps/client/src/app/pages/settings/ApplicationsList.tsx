import AppsIcon from '@mui/icons-material/Apps'
import { Skeleton } from '@mui/material'

import { QueryKeys, useQueryData } from '../../api'
import { Card, CopyButton } from '../../components'
import { ApplicationsResponse } from './types'

function ApplicationsListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-2 px-2">
      {new Array(3).fill('').map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card className="w-full py-2 px-4 flex flex-col gap-2" key={index}>
          <Skeleton className="w-6 h-3" />
          <Skeleton className="w-12 h-3" />
          <div className="flex flex-row gap-2">
            <Skeleton className="w-3/4 h-3" />
            <Skeleton className="w-6 h-3" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export function ApplicationsList() {
  const { isFetching, isLoading, data } = useQueryData<ApplicationsResponse>({
    url: `applications`,
    queryKey: [QueryKeys.Applications],
  })

  if (isFetching || isLoading) {
    return <ApplicationsListSkeleton />
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-2 px-2">
      {data?.apps?.map((app) => (
        <Card className="w-full py-2 px-4 flex flex-col gap-2" key={app.id}>
          <Card.Header className="flex flex-row gap-2">
            <AppsIcon color="action" />
            {app.name}
          </Card.Header>
          <Card.Body className="flex flex-row gap-2">
            <div>ID: {app.id}</div>
            <CopyButton value={app.id} />
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
