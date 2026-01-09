import { CircularProgress } from '@mui/material'
import { FunctionComponent, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { appRoutes } from './routes'

const OverviewPage = lazy(() => import('./pages/overview/OverviewPage'))
const MyNotesPage = lazy(() => import('./pages/my-notes/MyNotesPage'))
const BuilderPage = lazy(() => import('./pages/builder/BuilderPage'))

const ApplicationsPage = lazy(
  () => import('./pages/applications/ApplicationsPage')
)

const pathComponentMap: Record<string, FunctionComponent> = {
  [appRoutes.overview.path]: OverviewPage,
  [appRoutes.notes.path]: MyNotesPage,
  [appRoutes.note.path]: BuilderPage,
  [appRoutes.createNote.path]: BuilderPage,
  [appRoutes.applications.path]: ApplicationsPage,
}

export function AppRouter() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={appRoutes.overview.path} replace />}
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
