import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { NoteProps } from './types'
import CellTowerIcon from '@mui/icons-material/CellTower'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useNavigate } from 'react-router-dom'
import { useNoteActions } from '../../hooks'
import { useMemo, useState } from 'react'

export default function NoteMenu({ id, name }: NoteProps) {
  const navigate = useNavigate()
  const { pushNote, deleteNote } = useNoteActions({ id, name })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = !!anchorEl

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const onClose = () => {
    setAnchorEl(null)
  }

  const items = useMemo(
    () => [
      {
        label: 'Edit',
        onClick: () => navigate(`/note/${id}`),
        Icon: EditNoteIcon,
      },
      {
        label: 'Publish',
        onClick: () => pushNote(),
        Icon: CellTowerIcon,
      },
      {
        label: 'Delete',
        onClick: () => deleteNote(),
        Icon: DeleteOutlineIcon,
      },
    ],
    [navigate, pushNote, deleteNote]
  )
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={onClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'note menu',
          sx: {
            width: '12rem',
          },
        }}
      >
        {items.map(({ Icon, label, onClick }) => (
          <MenuItem
            key={label}
            onClick={onClick}
            className="flex flex-row gap-2"
          >
            <Icon color="action" />
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
