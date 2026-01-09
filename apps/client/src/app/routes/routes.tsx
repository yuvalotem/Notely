import AppsIcon from '@mui/icons-material/Apps'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Note from '@mui/icons-material/Note'
import NotesIcon from '@mui/icons-material/Notes'
import { SvgIconProps } from '@mui/material'
import { FunctionComponent } from 'react'

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
  overview: {
    path: '/overview',
    title: 'Overview',
    Icon: DashboardIcon,
  },
  notes: {
    path: '/notes',
    title: 'Notes',
    Icon: NotesIcon,
    sub: {
      createNote: {
        path: '/create',
        title: 'Create Note',
        Icon: DashboardIcon,
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
  applications: {
    path: '/applications',
    title: 'Applications',
    Icon: AppsIcon,
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
