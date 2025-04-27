import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function GetSession () {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <>
      {session && (
        <Link href='/dash' className='block px-3 py-1.5 text-[12px] leading-3.5 rounded-sm bg-neutral-100 text-neutral-900 hover:bg-neutral-300 transition-colors duration-200 ease-in-out'>
          Dashboard
        </Link>
      )}
    </>
  )
}
