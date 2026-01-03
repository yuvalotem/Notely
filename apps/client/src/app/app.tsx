import { AppRouter } from './AppRouter'
import { buildAppProviders, SnackbarProvider } from './ContextProviders'
import { AppQueryClientProvider } from './ContextProviders/AppQueryClientProvider'
import { NavBar } from './nav-bar'

const AppProviders = buildAppProviders([
  AppQueryClientProvider,
  SnackbarProvider,
])

export function App() {
  return (
    <AppProviders>
      <div className="mesh-bg" />
      <div className="relative z-10 flex flex-col h-[100vh] w-[100vw] bg-white/30 backdrop-blur-sm overflow-hidden">
        <NavBar />
        <AppRouter />
      </div>
    </AppProviders>
  )
}

export default App
