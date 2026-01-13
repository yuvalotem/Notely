import { CircularProgress } from '@mui/material'
import { FunctionComponent, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { appRoutes } from './routes'

const OverviewPage = lazy(() => import('./pages/overview/OverviewPage'))

const NotificationsPage = lazy(
  () => import('./pages/notifications/NotificationsPage')
)

const BuilderPage = lazy(() => import('./pages/builder/BuilderPage'))

const ApplicationsPage = lazy(
  () => import('./pages/applications/ApplicationsPage')
)

const pathComponentMap: Record<string, FunctionComponent> = {
  [appRoutes.overview.path]: OverviewPage,
  [appRoutes.notifications.path]: NotificationsPage,
  [appRoutes.notification.path]: BuilderPage,
  [appRoutes.createNotification.path]: BuilderPage,
  [appRoutes.applications.path]: ApplicationsPage,
}

export function AppRouter() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route
          element={<Navigate replace to={appRoutes.overview.path} />}
          path="/"
        />
        {Object.keys(appRoutes).map((key) => {
          const { path } = appRoutes[key]
          const Component = pathComponentMap[path]

          return <Route element={<Component />} key={path} path={path} />
        })}
      </Routes>
    </Suspense>
  )
}
