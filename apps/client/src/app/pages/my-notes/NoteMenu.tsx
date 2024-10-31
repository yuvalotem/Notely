import CellTowerIcon from '@mui/icons-material/CellTower'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNoteActions } from '../../hooks'
import { DeleteNoteDialog } from './DeleteNoteDialog'
import { NoteProps } from './types'

export default function NoteMenu({ id, name }: NoteProps) {
  const navigate = useNavigate()
  const [isDeleteDialogVisible, setDeleteDialogVisiblity] = useState(false)
  const { pushNote } = useNoteActions({ id, name })
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
        onClick: () => setDeleteDialogVisiblity(true),
        Icon: DeleteOutlineIcon,
      },
    ],
    [id, navigate, pushNote, setDeleteDialogVisiblity]
  )

  return (
    <div>
      <IconButton
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="true"
        id="basic-button"
        onClick={onClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'note menu',
          sx: {
            width: '12rem',
          },
        }}
        anchorEl={anchorEl}
        onClose={onClose}
        open={isOpen}
      >
        {items.map(({ Icon, label, onClick: onItemClick }) => (
          <MenuItem
            className="flex flex-row gap-2"
            key={label}
            onClick={onItemClick}
          >
            <Icon color="action" />
            {label}
          </MenuItem>
        ))}
      </Menu>
      <DeleteNoteDialog
        id={id}
        isOpen={isDeleteDialogVisible}
        name={name}
        onClose={() => setDeleteDialogVisiblity(false)}
      />
    </div>
  )
}
