'use client'

import { useState } from 'react'
import NavDash from './components-dash/nav-dash'
import Sidebar from './components-dash/sidebar'

export default function DashLayout ({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className='flex flex-col min-h-screen'>
      <NavDash
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />
      <div className='flex-1 flex relative'>
        <Sidebar
          isCollapsed={isCollapsed}
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />
        <main className='flex-1 overflow-auto p-4 z-0'>
          {children}
        </main>
      </div>
    </div>
  )
}
