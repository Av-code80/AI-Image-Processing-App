'use client'
import H1 from '@/components/atom/H1'
import Sidebar from '@/components/molecule/Sidebar'
import RemoveBackground from '@/components/organism/RemoveBackground'
import ReplaceBackground from '@/components/organism/ReplaceBackground'
import Upscale from '@/components/organism/Upscale'
import { useState } from 'react'

enum Tab {
  RemoveBackground = 'Remove Background',
  ReplaceBackground = 'Replace Background',
  SuperResolution = 'Super Resolution',
}
const TABS = Object.values(Tab)
export default function Home() {
  const [tab, setTab] = useState(Tab.RemoveBackground)
  const onTabUpdate = (item: string) => setTab(item as Tab)

  return (
    <>
      <header>
        <H1 className="sm:ml-64 mt-4 text-purple-900 ">{tab}</H1>
      </header>
      <main className="flex h-[calc(100vh-40px)] overflow-hidden flex-col items-center justify-between p-4">
        <Sidebar items={TABS} selectedTab={tab} onTabClick={onTabUpdate} />
        <section className="p-4 sm:ml-64 flex flex-col justify-center align-middle h-full">
          {tab === Tab.RemoveBackground ? (
            <RemoveBackground />
          ) : tab === Tab.ReplaceBackground ? (
            <ReplaceBackground />
          ) : (
            <Upscale />
          )}
        </section>
      </main>
    </>
  )
}
