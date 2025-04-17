import SignInForm from '@/components/sign-in-form'
import Nav from '@/components/nav'

export default function HomePage () {
  return (
    <main className='flex h-screen'>
      <div className='flex w-full lg:w-[500px] mx-7 md:mx-40 lg:mx-5'>
        <div className='relative w-full'>
          <SignInForm />
          <Nav />

        </div>
      </div>

      <section className='hidden lg:flex lg:flex-col bg-neutral-900/75 w-full mr-2.5 my-2.5 rounded-lg'>
        <div className='m-5 text-center'>
          <h1 className='text-2xl font-medium'>Create a new Database</h1>
        </div>
      </section>
    </main>
  )
}
