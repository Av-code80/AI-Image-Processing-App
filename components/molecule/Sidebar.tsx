import React, { useMemo, useState } from 'react'

interface SidebarProps {
  items: string[]
  selectedTab: string
  onTabClick: (item: string) => void
}

const Sidebar = ({ items, selectedTab, onTabClick }: SidebarProps) => {
  const [toggle, setToggle] = useState(true)

  const onMapItems = useMemo(() => {
    return items.map((item) => (
      <li
        key={item}
        onClick={() => {
          onTabClick(item)
          setToggle(true)
        }}
      >
        <a
          href="#"
          className={`flex items-center p-2 text-gray-900 rounded-lg hover:text-purple-400  
                ${
                  selectedTab === item
                    ? 'bg-purple-900 text-white hover:text-white'
                    : ''
                }`}
        >
          <span className="ml-3">{item}</span>
        </a>
      </li>
    ))
  }, [items, selectedTab, onTabClick])

  return (
    <>
      <button
        className="fixed left-0 top-0 sm:hidden text-purple-900"
        onClick={() => setToggle(false)}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${
          toggle && '-translate-x-full duration-300'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">{onMapItems}</ul>
        </div>
      </aside>

      <div
        onClick={() => setToggle(true)}
        className={`bg-gray-900 bg-opacity-50 inset-0 fixed top-0 left-0 z-30 h-screen transition-transform duration-50 ${
          toggle && '-translate-x-full'
        }`}
      ></div>
    </>
  )
}

export default Sidebar
