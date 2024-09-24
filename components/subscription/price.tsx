"use client";

import React from 'react'
import { CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Checkout from './checkout';
import useUser from '@/hook/useUser';
import SubscriptionTrue from './subscriptionTrue';

export default function Price() {

    const { data: user, isLoading } = useUser();

    const prices = [
        {
            title: "Basic",
            description: "Ideal for individuals looking for essential gym access",
            benefits: [
                "Unlimited gym access",
                "Access to group fitness classes",
                "Locker usage"
            ],
            amount: 50,
            priceId: "price_1Q18jG2KRfX6Ea4qsinjJ3Ii",
        },
        {
            title: "Standard",
            description: "Perfect for those who want more features and flexibility",
            benefits: [
                "Unlimited gym access",
                "All group fitness classes",
                "Free locker and towel service",
                "2 Personal training sessions per month"
            ],
            amount: 80,
            priceId: "price_1Q18jl2KRfX6Ea4qnsj2Q4JM"
        },
        {
            title: "Premium",
            description: "Best for those who want a full gym experience",
            benefits: [
                "Unlimited gym access",
                "All group fitness classes",
                "Unlimited personal training",
                "Spa and sauna access",
                "Private locker"
            ],
            amount: 120,
            priceId: "price_1Q18kA2KRfX6Ea4qQpOHqNV2"
        }
    ]

    if (isLoading) {
        return <></>
    }
    if (user?.subscription?.customer_id) {
        return <SubscriptionTrue/>
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {prices.map((price, index) => {

                    const isPopular = index === 1;
                    return (
                        <div key={index} className={cn("border rounded-md p-5 space-y-5", { "ring-2 ring-green-500": isPopular, })}
                        >

                            <div className='space-y-3'>
                                <h1 className='text-1xl font-bold'>{price.title}</h1>
                                <h3 className='text-2xl font-bold'>{price.amount}$</h3>
                                <p className='text-sm text-gray-400'>{price.description}</p>
                            </div>
                            <div className='space-y-1'>
                                {price.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                        <CircleCheck />
                                        <h1 className='text-sm text-gray-400'>{benefit}</h1>
                                    </div>
                                ))}
                            </div>
                            <Checkout priceId={price.priceId} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
