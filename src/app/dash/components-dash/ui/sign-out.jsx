'use client'

import { authClient } from '@/libs/auth-client'
import { useRouter } from 'next/navigation'
import { LogoutIcon } from '../../resources/assets/dash-icons'

export default function SignOut () {
  const router = useRouter()

  async function handleSignOut () {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        }
      }
    })
  }

  return (
    <button
      type='button'
      aria-label='Logout'
      className='icon-border'
      onClick={() => handleSignOut()}
    >
      <LogoutIcon />
    </button>
  )
}
