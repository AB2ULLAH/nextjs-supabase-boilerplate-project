"use client";

import { Button } from '@/components/ui/button'
import { FaGoogle } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { TbBrandSupabase } from "react-icons/tb";
import React from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const params = useSearchParams();
    const next = params.get("next ");
    const handleLoginWithOAuth = (provider: "google" | "github") => {
        const supabase = supabaseBrowser()
        supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + "/auth/callback?next=" + next,
            },

        });

    };






    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='w-96 h-50 rounded-md border p-5 space-y-5 space-x-1 relative bg-indigo-900 opacity-80'>

                <div className='flex items-center gap-3'>
                    <h1 className='flex items-center text-5xl font-bold gap-7 mx-auto '><TbBrandNextjs /><TbBrandSupabase /></h1>
                </div>
                <h6 className='text-center text-1xl gap-5 ml-10 tracking-wider'>NodeJs + SupaBase</h6>


                <h3 className='text-sm text-gray-300 text-center'> Register Now ! 👇 </h3>
                <Button className='w-full flex items-center gap-2' variant={'outline'}
                    onClick={() => handleLoginWithOAuth("google")}>

                    <FaGoogle />Google
                </Button>

                <Button className='w-full flex items-center gap-2' variant={'outline'}
                    onClick={() => handleLoginWithOAuth("github")}>

                    <SiGithub />Github</Button>

            </div>
            <div className='glowBox -z-10'></div>
        </div>

    )
}
