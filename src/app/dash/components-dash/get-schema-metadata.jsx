'use client'

import { deleteSchemaMetadata, getSchemaMetadata } from '@/utils/schema-matadata'
import { useEffect, useState } from 'react'
import { LayoutListIcon, MaximizeIcon, TrashIcon } from '../resources/assets/dash-icons'
import Link from 'next/link'

export default function GetSchemaMetadata () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await getSchemaMetadata()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col gap-y-2.5'>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className='p-2.5 border border-neutral-500/50 rounded-md animate-pulse'>
            <div className='flex items-center justify-between'>
              <div className='h-4.5 w-1/2 bg-neutral-700/75 rounded' />
              <div className='flex items-center gap-x-2'>
                <div className='size-4 bg-neutral-700/75 rounded' />
                <div className='size-4 bg-neutral-700/75 rounded' />
              </div>
            </div>
            <div className='h-3.5 w-full bg-neutral-700/75 rounded mt-2.5' />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <h3 className='text-center text-sm'>An unexpected error occurred</h3>
    )
  }

  return (
    <div className='flex flex-col gap-y-2.5'>
      {data.length > 0
        ? (
            data.map((item) => (
              <article key={item.id} className='flex flex-col p-2.5 border border-neutral-500/50 rounded-md'>
                <div className='flex items-center justify-between gap-x-2.5'>
                  <h3 className='text-base font-medium truncate leading-4'>{item.title}</h3>

                  <div className='flex items-center gap-x-1.5 text-neutral-400'>
                    <Link
                      href='#'
                      className='block hover:text-yellow-500 transition-colors duration-200 ease-in-out cursor-pointer'
                    >
                      <MaximizeIcon />
                    </Link>
                    <button
                      type='button'
                      className='hover:text-red-500 transition-colors duration-200 ease-in-out cursor-pointer'
                      onClick={() => {
                        deleteSchemaMetadata({
                          id: item.id,
                          onSuccess: () => {
                            setData((prev) => prev.filter((project) => project.id !== item.id))
                          }
                        })
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
                <p className={`text-sm text-neutral-400 leading-4.5 ${item.description && 'mt-1.5'}`}>
                  {item.description}
                </p>
              </article>
            ))
          )
        : (
          <div className='flex flex-col items-center text-neutral-400'>
            <LayoutListIcon />
            <h3 className='text-base font-medium'>No projects</h3>
          </div>
          )}
    </div>
  )
}
