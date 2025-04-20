export default function ProjectPage ({ params }) {
  const { id } = params

  return (
    <main className='mt-5'>
      <h1 className='text-xl font-bold text-center'>Project ID: {id}</h1>
    </main>
  )
}
