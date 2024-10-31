import { appRoutes } from '../routes'
import { NavBarItem, NavBarItemProps } from './NavBarItem'
import logo from './notely-logo.svg'

const items: NavBarItemProps[] = Object.values(appRoutes)
  .filter(({ hiddenFromNavbar }) => !hiddenFromNavbar)
  .map(({ title, Icon, ...rest }) => ({
    ...rest,
    label: title,
    icon: <Icon color="action" />,
  }))

export function NavBar() {
  return (
    <div className="flex flex-col h-[100vh] w-60 border-x-[1px]">
      <h1 className="flex h-12 border-b-[1px] items-center pl-2 gap-2">
        <img
          alt="Notely"
          src={logo as React.ImgHTMLAttributes<HTMLImageElement>['src']}
          style={{ width: '1rem', height: '1rem' }}
        />
        Notely
      </h1>
      {items.map((item) => (
        <NavBarItem key={item.label} {...item} />
      ))}
    </div>
  )
}
