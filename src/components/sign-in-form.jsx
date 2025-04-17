'use client'

import { authClient } from '@/libs/auth-client'
import { GitHubIcon } from '@/resources/assets/main-icons'
import Image from 'next/image'

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
    <section className='relative w-full lg:w-[500px] mx-7 md:mx-40 lg:mx-5'>
      <div className='flex items-center gap-x-1 mt-5'>
        <Image width={18} height={18} src='/favicon.ico' alt='logo' />
        <h2 className='text-sm font-medium'>StashOne</h2>
      </div>

      <div className='w-full absolute bottom-10'>
        <button
          type='button'
          className='session-btn'
          onClick={signInWithGithub}
        >
          <GitHubIcon />
          <span>Continue with GitHub</span>
        </button>
      </div>
    </section>
  )
}
