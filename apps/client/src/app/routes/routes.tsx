import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonIcon from '@mui/icons-material/Person'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

export const appRoutes = {
  home: {
    path: '/',
    title: 'My Notes',
    icon: <HomeIcon />,
    sub: {
      path: '/create',
    },
  },
  profile: {
    path: '/profile',
    title: 'Profile',
    icon: <PersonIcon />,
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
  help: {
    path: '/help',
    title: 'Help',
    icon: <QuestionMarkIcon />,
  },
}
