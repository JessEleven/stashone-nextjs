'use client'

import { authClient } from '@/libs/auth-client'
import { GitHubIcon } from '@/resources/assets/main-icons'

export default function SignInForm () {
  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dash'
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <div className='w-full absolute bottom-10'>
      <h3 className='mb-5 text-xl font-medium'>Sign in to create a database</h3>
      <button
        type='button'
        className='session-btn'
        onClick={signInWithGithub}
      >
        <GitHubIcon />
        <span>Continue with GitHub</span>
      </button>
    </div>
  )
}
