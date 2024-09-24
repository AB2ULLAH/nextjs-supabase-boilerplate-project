"use client";
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import useUser from '@/hook/useUser';
import Image from 'next/image';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { protectedPaths } from '@/lib/constant';

export default function Profie() {

  const { isFetching, data } = useUser();
  const QueryClient = useQueryClient()
  const router = useRouter();
  const pathName = usePathname();


  if (isFetching) {
    return <></>
  }

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    QueryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    if(protectedPaths.includes(pathName)){
        router.replace('/auth?next'+pathName)
    }
  }









  return (
    <div className='flex items-center justify-center text-2xl mt-5 z-50'>
      {!data?.id ? (<Link href='/auth'>
        <Button variant="outline"> Sign up</Button>
      </Link>) : (

        < >
          {data?.image_url ? <Image src={data.image_url || ""}
            alt={data.display_name || ""}
            width={50}
            height={50}
            className='rounded-full ring-2 cursor-pointer'
            onClick={handleLogout}
          />
            :
            <div className='h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-bold cursor-pointer'
              onClick={handleLogout}
            >
              <h1>
                {data.email[0]}
              </h1>
            </div>
          }
        </>
      )}
    </div>
  );
}
