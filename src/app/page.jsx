import SignInForm from '@/components/sign-in-form'

export default function HomePage () {
  return (
    <main className='flex h-screen'>
      <SignInForm />

      <section className='hidden lg:flex lg:flex-col bg-neutral-900/75 w-full mr-2.5 my-2.5 rounded-lg'>
        <div className='m-5 text-center'>
          <h1 className='text-2xl font-medium'>Create a new Database</h1>
        </div>
      </section>
    </main>
  )
}
