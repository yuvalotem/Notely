import { appRoutes } from '../routes'
import { NavBarItem, NavBarItemProps } from './NavBarItem'
import NoteIcon from '@mui/icons-material/EditNote'

const items: NavBarItemProps[] = Object.values(appRoutes).map(
  ({ title, ...r }) => ({ ...r, label: title })
)

export const NavBar = () => {
  return (
    <div className="flex flex-col h-[100vh] w-60 border-x-2">
      <h1 className="flex h-12 items-center pl-2 gap-1">
        <NoteIcon className="bg-inherit color-grey-200" />
        Notely
      </h1>
      {items.map((item) => (
        <NavBarItem key={item.label} {...item} />
      ))}
    </div>
  )
}
