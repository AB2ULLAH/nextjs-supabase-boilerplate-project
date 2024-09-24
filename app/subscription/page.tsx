"use client";
import useUser from '@/hook/useUser';
import React from 'react'
import Post from './components/Post';
import Price from '@/components/subscription/price';

export default function Page() {

  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return <></>
  }



  const isActive = !user?.subscription?.end_at ? false : new Date(user.subscription.end_at) > new Date();
  return (
    <div>
      <div>
        {isActive ? <Post />
          : <div>
            <h1 className='text-center text-3xl font-bold mt-5 mb-10'>
              You need to subscribe to access the data.
            </h1>
            <Price />
          </div>
        }
      </div>

    </div>
  )
}
