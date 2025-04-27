import { LayoutSidevarFilledIcon, LayoutSidevarIcon } from '../resources/assets/dash-icons'
import GetAvatar from './ui/get-avatar'
import SignOut from './ui/sign-out'

export default function NavDash ({ toggleSidebar, isCollapsed }) {
  return (
    <header className='h-[50px] bg-neutral-900/75 flex items-center p-5 border-b border-pink-700/50'>
      <div className='flex items-center justify-between w-full md:w-[380px]'>
        <div className='flex items-center gap-x-2'>
          <GetAvatar />
          <SignOut />
        </div>

        <button type='button' aria-label='Layout sidebar' onClick={toggleSidebar} className='icon-border'>
          {isCollapsed ? <LayoutSidevarIcon /> : <LayoutSidevarFilledIcon />}
        </button>
      </div>
    </header>
  )
}
