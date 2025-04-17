import Image from 'next/image'
import GetSession from './ui/get-session'

export default function Nav () {
  return (
    <header className='flex items-center justify-between mt-5'>
      <div className='flex items-center gap-x-1'>
        <Image
          width={20}
          height={20}
          src='/favicon.ico'
          alt='logo'
        />
        <h3 className='text-sm font-medium'>StashOne</h3>
      </div>

      <GetSession />
    </header>
  )
}
