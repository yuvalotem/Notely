import HomeIcon from '@mui/icons-material/Home'
import NotesIcon from '@mui/icons-material/Notes'
import SettingsIcon from '@mui/icons-material/Settings'
import Note from '@mui/icons-material/Note'
import { FunctionComponent } from 'react'
import { SvgIconProps } from '@mui/material'

type RouteOptions = {
  path: string
  title: string
  hiddenFromNavbar?: boolean
  Icon: FunctionComponent<SvgIconProps>
}

type NestedAppRoutes = Record<
  string,
  RouteOptions & { sub?: Record<string, RouteOptions> }
>

export const nestedAppRoutes: NestedAppRoutes = {
  home: {
    path: '/',
    title: 'Home',
    Icon: HomeIcon,
  },
  notes: {
    path: '/notes',
    title: 'My Notes',
    Icon: NotesIcon,
    sub: {
      createNote: {
        path: '/create',
        title: 'My Notes',
        Icon: HomeIcon,
        hiddenFromNavbar: true,
      },
    },
  },
  note: {
    path: '/note/:id',
    title: 'Note',
    Icon: Note,
    hiddenFromNavbar: true,
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    Icon: SettingsIcon,
  },
}

const flattenRoutes = (routes: NestedAppRoutes): Record<string, RouteOptions> =>
  Object.entries(routes).reduce(
    (acc, [key, route]) => ({
      ...acc,
      [key]: route,
      ...(route.sub
        ? Object.entries(route.sub).reduce(
            (subAcc, [subKey, subRoute]) => ({
              ...subAcc,
              [subKey]: { ...subRoute, path: `${route.path}${subRoute.path}` },
            }),
            {}
          )
        : {}),
    }),
    {}
  )

export const appRoutes = flattenRoutes(nestedAppRoutes)
