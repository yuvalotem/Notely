import { appRoutes } from '../routes'
import { NavBarItem, NavBarItemProps } from './NavBarItem'
import NoteIcon from '@mui/icons-material/EditNote'

const items: NavBarItemProps[] = Object.values(appRoutes)
  .filter(({ hiddenFromNavbar }) => !hiddenFromNavbar)
  .map(({ title, Icon, ...rest }) => ({
    ...rest,
    label: title,
    icon: <Icon color="action" />,
  }))

export const NavBar = () => {
  return (
    <div className="flex flex-col h-[100vh] w-60 border-x-[1px]">
      <h1 className="flex h-12 border-b-[1px] items-center pl-2 gap-1">
        <NoteIcon color="action" />
        Notely
      </h1>
      {items.map((item) => (
        <NavBarItem key={item.label} {...item} />
      ))}
    </div>
  )
}
