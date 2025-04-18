'use client'

import { authClient } from '@/libs/auth-client'
import { useEffect, useState } from 'react'

function getInitials (name) {
  if (!name) return 'N/A'
  const parts = name.trim().split(' ')

  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function GetAvatar () {
  const [user, setUser] = useState('')

  useEffect(() => {
    (async () => {
      const { data } = await authClient.getSession()
      setUser(data?.user)
    })()
  }, [])
  const initials = getInitials(user?.name)

  return (
    <div className='flex items-center justify-center size-8 rounded-full bg-neutral-50'>
      {user?.image
        ? <img src={user?.image} alt='N/A' className='rounded-full object-cover' />
        : <div className='text-sm font-medium text-neutral-900'>{initials}</div>}
    </div>
  )
}
