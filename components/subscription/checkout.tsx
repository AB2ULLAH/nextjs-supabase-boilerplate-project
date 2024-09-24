"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import useUser from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import { checkout } from '@/lib/actions/stripe';
import { loadStripe } from '@stripe/stripe-js';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/lib/utils';

export default function Checkout({ priceId }: { priceId: string }) {

    const { data: user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (user?.id) {
            setLoading(true);
            const data = JSON.parse(await checkout(user.email, 
                priceId, 
                window.location.origin + "/success",

            ));

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
            const res = await stripe?.redirectToCheckout({ sessionId: data.id });

            if (res?.error) {
                alert(res.error.message);
                setLoading(false);
            } else {
                router.push("/auth?next=" + window.location.pathname);
            }
        }
    }

    return (
        <div>
            <Button className='w-full opacity-90 flex items-center gap-2' onClick={handleCheckout}>Getting Started
                <AiOutlineLoading3Quarters className={cn("animate-spin",loading?"block":"hidden")}/>
            </Button>
        </div>
    );
}
