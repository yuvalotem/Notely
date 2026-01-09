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
  matcher?: (pathname: string) => boolean
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
  Object.entries(routes).reduce((acc, [key, route]) => {
    const flatRoute = {
      ...route,
      matcher: (pathname: string) =>
        pathname === route.path || pathname.startsWith(`${route.path}/`),
    }

    return {
      ...acc,
      [key]: flatRoute,
      ...(route.sub
        ? Object.entries(route.sub).reduce((subAcc, [subKey, subRoute]) => {
            const fullPath = `${route.path}${subRoute.path}`

            return {
              ...subAcc,
              [subKey]: {
                ...subRoute,
                path: fullPath,
                matcher: (pathname: string) =>
                  pathname === fullPath || pathname.startsWith(`${fullPath}/`),
              },
            }
          }, {})
        : {}),
    }
  }, {})

export const appRoutes = flattenRoutes(nestedAppRoutes)

// Custom matchers for specific routes that don't follow the default hierarchy
appRoutes.notes.matcher = (pathname: string) =>
  pathname === appRoutes.notes.path ||
  pathname.startsWith(`${appRoutes.notes.path}/`) ||
  pathname.startsWith('/note/')

export const isRouteActive = (path: string, pathname: string) => {
  const route = Object.values(appRoutes).find((r) => r.path === path)

  return route ? route.matcher?.(pathname) ?? false : false
}
