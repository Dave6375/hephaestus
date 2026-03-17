import React from 'react'
import { Navbar } from '@/components/sections/navbar'

const HomeSection = () => {
    return (
        <div className='relative mx auto max-w-7xl border-x'>
          <div className='absolute top-0 left-6 z-10 block h-full w-px border-border border-1'></div>
            <div className='absolute top-0 right-6 z-10 block h-full w-px border-border border-r'></div>

            <Navbar />
            <main className='flex min-h-screen w-full flex-col items-center justify-center divide-y divide-border'>


            </main>
          </div>
    )
}
export default HomeSection
