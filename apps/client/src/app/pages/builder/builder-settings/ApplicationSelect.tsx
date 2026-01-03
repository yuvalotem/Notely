import { MenuItem, Select } from '@mui/material'

import { QueryKeys, useQueryData } from '../../../api'
import { ApplicationsResponse } from '../../applications/types'
import { useBuilderContext } from '../BuilderContext'

export function ApplicationSelect() {
  const { appId, setAppId } = useBuilderContext()

  const { data } = useQueryData<ApplicationsResponse>({
    url: `applications`,
    queryKey: [QueryKeys.Applications],
  })

  return (
    <div>
      <h3>Application</h3>
      <Select
        defaultValue={data?.apps?.[0]?.id}
        key={appId}
        label="Applciation"
        onChange={(event) => setAppId(event.target.value)}
        sx={{ width: '20rem' }}
        value={appId}
      >
        {data?.apps?.map((app) => (
          <MenuItem key={app.id} value={app.id}>
            {app.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
