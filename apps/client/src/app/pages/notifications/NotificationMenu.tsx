import CellTowerIcon from '@mui/icons-material/CellTower'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotificationActions } from '../../hooks'
import { DeleteNotificationDialog } from './DeleteNotificationDialog'
import { NotificationProps } from './types'

export default function NotificationMenu({ id, name }: NotificationProps) {
  const navigate = useNavigate()
  const [isDeleteDialogVisible, setDeleteDialogVisiblity] = useState(false)
  const { pushNotification } = useNotificationActions({ id, name })
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
        onClick: () => navigate(`/notification/${id}`),
        Icon: EditIcon,
      },
      {
        label: 'Publish',
        onClick: () => pushNotification(),
        Icon: CellTowerIcon,
      },
      {
        label: 'Delete',
        onClick: () => setDeleteDialogVisiblity(true),
        Icon: DeleteOutlineIcon,
      },
    ],
    [id, navigate, pushNotification, setDeleteDialogVisiblity]
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
          'aria-labelledby': 'notification menu',
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
            onClick={onItemClick}
          >
            <Icon color="action" />
            {label}
          </MenuItem>
        ))}
      </Menu>
      <DeleteNotificationDialog
        id={id}
        isOpen={isDeleteDialogVisible}
        name={name}
        onClose={() => setDeleteDialogVisiblity(false)}
      />
    </div>
  )
}
