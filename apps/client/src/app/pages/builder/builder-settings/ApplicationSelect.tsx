import { MenuItem, Select } from '@mui/material'

import { QueryKeys, useQueryData } from '../../../api'
import { ApplicationsResponse } from '../../applications/types'
import { useBuilderContext } from '../BuilderContext'

export function ApplicationSelect({ id }: { id?: string }) {
  const { appId, setAppId } = useBuilderContext()

  const { data } = useQueryData<ApplicationsResponse>({
    url: `applications`,
    queryKey: [QueryKeys.Applications],
  })

  return (
    <Select
      fullWidth
      id={id}
      key={appId}
      label="Application"
      onChange={(event) => setAppId(event.target.value)}
      placeholder="Select..."
      size="small"
      sx={{
        borderRadius: '0.75rem',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(4px)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgb(209, 213, 219)', // ios-gray-300
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.6)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 122, 255, 0.5)', // ios-blue
          borderWidth: '2px',
        },
      }}
      value={appId}
    >
      {data?.apps?.map((app) => (
        <MenuItem key={app.id} value={app.id}>
          {app.name}
        </MenuItem>
      ))}
    </Select>
  )
}
