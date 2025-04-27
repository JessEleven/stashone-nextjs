'use client'

import { authClient } from '@/libs/auth-client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function GetAvatar () {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data } = await authClient.getSession()
      setUser(data?.user)
      setLoading(false)
    })()
  }, [])

  return (
    <Link href='/' className='block rounded-full'>
      {loading
        ? <div className='size-8 rounded-full bg-linear-30 from-green-300 to-purple-400' />
        : (
          <img src={user?.image} alt='Avatar' className='size-8 rounded-full object-contain' />
          )}
    </Link>
  )
}
