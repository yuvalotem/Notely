import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { QueryKeys, useQueryData } from '../../../api'
import { ApplicationsResponse } from '../../settings/types'
import { useBuilderContext } from '../BuilderContext'

export const ApplicationSelect = () => {
  const { appId, setAppId } = useBuilderContext()
  const { data } = useQueryData<ApplicationsResponse>({
    url: `applications`,
    queryKey: [QueryKeys.Applications],
  })

  return (
    <FormControl fullWidth>
      <InputLabel id="app-select-label">Applciation</InputLabel>
      <Select
        labelId="app-select-label"
        id="app-select"
        value={appId}
        label="Applciation"
        onChange={(event) => setAppId(event.target.value)}
        sx={{ width: '300px' }}
      >
        {data?.apps?.map((app) => (
          <MenuItem key={app.id} value={app.id}>
            {app.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
