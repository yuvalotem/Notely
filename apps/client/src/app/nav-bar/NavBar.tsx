import { appRoutes } from '../routes'
import { NavBarItem, NavBarItemProps } from './NavBarItem'
import logo from './notely-logo.svg'

const items: NavBarItemProps[] = Object.values(appRoutes)
  .filter(({ hiddenFromNavbar }) => !hiddenFromNavbar)
  .map(({ title, Icon, ...rest }) => ({
    ...rest,
    label: title,
    icon: <Icon color="inherit" />,
  }))

export function NavBar() {
  return (
    <div className="sticky top-0 flex flex-row h-16 w-full border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-lg items-center shrink-0 z-50 px-[var(--app-margin-x)]">
      <h1 className="flex h-full items-center mr-12 gap-3 text-xl font-bold text-ios-dark/80 tracking-tight">
        <img
          alt="Notely"
          src={logo as React.ImgHTMLAttributes<HTMLImageElement>['src']}
          style={{ width: '1.5rem', height: '1.5rem' }}
          title="Notely"
        />
      </h1>
      <div className="flex flex-row items-center gap-2 h-full">
        {items.map((item) => (
          <NavBarItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}
