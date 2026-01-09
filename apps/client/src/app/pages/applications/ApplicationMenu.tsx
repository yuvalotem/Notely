import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useMemo, useState } from 'react'

import { DeleteApplicationDialog } from './DeleteApplicationDialog'

type ApplicationMenuProps = {
  id: string
  name: string
}

export default function ApplicationMenu({ id, name }: ApplicationMenuProps) {
  const [isDeleteDialogVisible, setDeleteDialogVisiblity] = useState(false)
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
        label: 'Delete',
        onClick: () => setDeleteDialogVisiblity(true),
        Icon: DeleteOutlineIcon,
      },
    ],
    [setDeleteDialogVisiblity]
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
          'aria-labelledby': 'application menu',
          sx: {
            width: '12rem',
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
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
            onClick={() => {
              onItemClick()
              onClose()
            }}
          >
            <Icon color="action" />
            {label}
          </MenuItem>
        ))}
      </Menu>
      <DeleteApplicationDialog
        id={id}
        isOpen={isDeleteDialogVisible}
        name={name}
        onClose={() => setDeleteDialogVisiblity(false)}
      />
    </div>
  )
}
