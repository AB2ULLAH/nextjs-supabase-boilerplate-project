import Profile from '@/components/Profile'
import Price from '@/components/subscription/price'
import Link from 'next/link'
import React from 'react'
import { IoHandRightOutline } from 'react-icons/io5'


export default function page() {
  return (
    <div className='stars twinkling clouds'>
      <h1 className='flex items-center justify-center text-4xl mt-10'> Precise Tech OAuth </h1>
      <div className='flex items-center justify-center'>
      <Link href={'/dashboard'} >Dashboard | </Link>
      <Link href={'/profile'} > | Profile |</Link>
      <Link href={'/subscription'} > | Subscription</Link>
      </div>
      <h3 className='flex items-center justify-center text-2xl mt-5'> Welcome <IoHandRightOutline className='text-fuchsia-50' /></h3>
      <Profile />
      <div className='flex items-center justify-center mt-5'>
      <Price  />
      </div>

    </div>

  )
}
