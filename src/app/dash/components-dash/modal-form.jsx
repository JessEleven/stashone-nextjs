'use client'

import { useState } from 'react'

export default function ModalForm ({ setShowModal }) {
  const [formData, setFormData] = useState({
    title: '', description: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(formData)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/70 px-5'>
      <div className='bg-neutral-800 w-full max-w-md rounded-lg px-5 py-7'>
        <h2 className='text-xl font-medium mb-1.5'>Create new Database</h2>
        <p className='text-sm text-neutral-400 mb-5'>To start building, first create a unique project</p>

        <form onSubmit={handleSubmit} className='text-sm'>
          <div className='mb-4'>
            <label htmlFor='title' className='block mb-2'>Project name</label>
            <input
              id='title'
              type='text'
              name='title'
              className='w-full rounded-sm px-2.5 py-1.5 outline outline-neutral-500 focus:outline-neutral-300/75'
              value={formData.title}
              onChange={handleChange}
              placeholder='e.g. StashOne'
            />
          </div>

          <div className='mb-7'>
            <label htmlFor='description' className='block mb-2'>Description</label>
            <textarea
              id='description'
              rows={3}
              name='description'
              className='w-full rounded-sm px-2.5 py-1.5 outline outline-neutral-500 focus:outline-neutral-300/75'
              value={formData.description}
              onChange={handleChange}
              placeholder='Is optional'
            />
          </div>

          <div className='flex justify-end space-x-3 font-medium'>
            <button type='button' className='btn py-1.5' onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type='submit' className='btn2 py-1.5'>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
