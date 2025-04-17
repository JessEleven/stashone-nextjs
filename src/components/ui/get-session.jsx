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
        <Link href='/dash' className='block px-3 py-1.5 text-[13px] leading-3.5 bg-teal-500/20 rounded-sm hover:bg-teal-500/30 transition-colors ease-in-out duration-200'>
          Dashboard
        </Link>
      )}
    </>
  )
}
