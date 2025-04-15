import Image from 'next/image'

export default function HomePage () {
  return (
    <main className='text-center text-2xl mt-5 ml-5'>
      <div className='flex items-center gap-x-1'>
        <Image width={28} height={28} src='/favicon.ico' alt='logo' />
        <h2>StashOne</h2>
      </div>
    </main>
  )
}
