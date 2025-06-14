'use client'

import { useState } from 'react'
import ModalForm from './modal-form'
import { PlusIcon } from '../resources/assets/dash-icons'
import GetSchemaMetadata from './get-schema-metadata'

export default function Sidebar ({ isCollapsed }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <aside
      className={`bg-neutral-900 text-white transition-all duration-300 z-40
      fixed top-[50px] md:top-0 bottom-0 left-0 transform ${isCollapsed ? 'translate-x-0' : '-translate-x-full'}
      w-full md:translate-x-0 md:relative md:block border-r border-pink-700/50 ${isCollapsed ? 'md:w-0' : 'md:w-[400px]'}
    `}
    >
      <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-100 md:opacity-0' : 'opacity-100'}`}>
        <div className='flex items-center justify-between p-5'>
          <h3 className='text-xl font-medium'>Your Projects</h3>

          <button
            className='flex items-center gap-x-1 btn py-1.5 text-sm font-medium'
            onClick={() => setShowModal(true)}
          >
            <PlusIcon /> <span>Add</span>
          </button>

          {showModal && <ModalForm setShowModal={setShowModal} />}
        </div>

        <div className='pl-5 pr-2.5 pb-2.5 mr-2.5 max-h-[550px] overflow-y-auto'>
          <GetSchemaMetadata />
        </div>
      </div>
    </aside>
  )
}
