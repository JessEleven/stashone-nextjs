export default function Sidebar ({ isCollapsed }) {
  return (
    <aside
      className={`bg-neutral-900 md:bg-neutral-900/75 text-white transition-all duration-300 z-40
      fixed top-[50px] md:top-0 bottom-0 left-0 transform ${isCollapsed ? 'translate-x-0' : '-translate-x-full'}
      w-full md:translate-x-0 md:relative md:block ${isCollapsed ? 'md:w-0' : 'md:w-[400px]'}
    `}
    >
      <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-100 md:opacity-0' : 'opacity-100'}`}>
        <div className='flex flex-col items-center p-5'>
          <h3 className='text-base font-medium'>List of created Databases</h3>
        </div>
      </div>
    </aside>
  )
}
