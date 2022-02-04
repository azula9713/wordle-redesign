import { FC } from 'react'
import { MenuIcon } from '@heroicons/react/solid'
import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'

const Header: FC = () => {
  const style = {
    header:
      'flex h-24 w-screen grid-cols-3 items-center justify-between bg-white p-8 shadow-lg md:grid',
    titleText:
      'text-center text-3xl font-extrabold uppercase md:text-5xl text-gray-700',
    invisDiv: 'hidden items-center md:flex',
    iconsContainer: 'hidden items-center justify-end md:flex',
    mobileMenuContainer: 'flex items-center justify-center md:hidden',
    mobileMenuIcon: 'text-black h-8 w-8 cursor-pointer ',
    icon: 'text-gray-700 h-7 w-7 mx-4 cursor-pointer hover:text-green-500 transition-all duration-300 ease-in-out',
  }

  return (
    <div className={style.header}>
      {/* LeftIcons */}
      <div className={style.invisDiv} />
      {/* title */}
      <div>
        <h1 className={style.titleText}>Wordle</h1>
      </div>

      {/* Right Icons */}
      <div className={style.iconsContainer}>
        <ChartBarIcon className={style.icon} />
        <CogIcon className={style.icon} />
        <InformationCircleIcon className={style.icon} />
      </div>

      {/* MobileView */}
      <div className={style.mobileMenuContainer}>
        <MenuIcon className={style.mobileMenuIcon} />
      </div>
    </div>
  )
}

export default Header
