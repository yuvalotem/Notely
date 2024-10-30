import { Route, Routes } from 'react-router-dom'
import { appRoutes } from './routes'
import { FunctionComponent, lazy, Suspense } from 'react'
import { CircularProgress } from '@mui/material'

const HomePage = lazy(() => import('./pages/home'))
const MyNotesPage = lazy(() => import('./pages/my-notes'))
const BuilderPage = lazy(() => import('./pages/builder'))
const SettingsPage = lazy(() => import('./pages/settings'))

const pathComponentMap: Record<string, FunctionComponent> = {
  [appRoutes.home.path]: HomePage,
  [appRoutes.notes.path]: MyNotesPage,
  [appRoutes.note.path]: BuilderPage,
  [appRoutes.createNote.path]: BuilderPage,
  [appRoutes.settings.path]: SettingsPage,
}

export function AppRouter() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        {Object.keys(appRoutes).map((key) => {
          const { path } = appRoutes[key]
          const Component = pathComponentMap[path]
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
    </Suspense>
  )
}

const AppLoader = () => {
  return <CircularProgress />
}
