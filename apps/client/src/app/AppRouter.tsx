import { CircularProgress } from '@mui/material'
import { FunctionComponent, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { appRoutes } from './routes'

const HomePage = lazy(() => import('./pages/home/HomePage'))
const MyNotesPage = lazy(() => import('./pages/my-notes/MyNotesPage'))
const BuilderPage = lazy(() => import('./pages/builder/BuilderPage'))
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'))

const pathComponentMap: Record<string, FunctionComponent> = {
  [appRoutes.home.path]: HomePage,
  [appRoutes.notes.path]: MyNotesPage,
  [appRoutes.note.path]: BuilderPage,
  [appRoutes.createNote.path]: BuilderPage,
  [appRoutes.settings.path]: SettingsPage,
}

export function AppRouter() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        {Object.keys(appRoutes).map((key) => {
          const { path } = appRoutes[key]
          const Component = pathComponentMap[path]

          return <Route element={<Component />} key={path} path={path} />
        })}
      </Routes>
    </Suspense>
  )
}
