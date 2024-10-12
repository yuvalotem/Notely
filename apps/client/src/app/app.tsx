import { AppRouter } from './AppRouter'
import { SnackbarProvider, buildAppProviders } from './ContextProviders'
import { AppQueryClientProvider } from './ContextProviders/AppQueryClientProvider'
import { NavBar } from './nav-bar'

const AppProviders = buildAppProviders([
  AppQueryClientProvider,
  SnackbarProvider,
])

export function App() {
  return (
    <AppProviders>
      <div className="flex flex-row h-[100vh] w-[100vw]">
        <NavBar />
        <AppRouter />
      </div>
    </AppProviders>
  )
}

export default App
