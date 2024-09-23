import { AppRouter } from './AppRouter'
import { NavBar } from './nav-bar'

export function App() {
  return (
    <div className="flex flex-row h-[100vh] w-[100vw]">
      <NavBar />
      <AppRouter />
    </div>
  )
}

export default App
