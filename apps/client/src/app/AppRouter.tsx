import { Route, Routes } from 'react-router-dom'
import { appRoutes } from './routes'
import { BuilderPage, MyNotesPage } from './pages'

export function AppRouter() {
  return (
    <Routes>
      <Route path={appRoutes.home.path} element={<MyNotesPage />} />
      <Route
        path={appRoutes.home.path + appRoutes.home.sub.path}
        element={<BuilderPage />}
      />
      <Route path={appRoutes.note.path} element={<BuilderPage />} />
      <Route
        path={appRoutes.settings.path}
        element={<div>{appRoutes.settings.title}</div>}
      />
      <Route
        path={appRoutes.profile.path}
        element={<div>{appRoutes.profile.title}</div>}
      />
      <Route
        path={appRoutes.help.path}
        element={<div>{appRoutes.help.title}</div>}
      />
    </Routes>
  )
}
