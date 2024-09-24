"use client";
import { Button } from '@/components/ui/button';
import useUser from '@/hook/useUser';
import { manageBilling } from '@/lib/actions/stripe';
import React, { useState, useEffect } from 'react';

export default function Subscription() {
	const { data: user, isLoading, refetch } = useUser(); // Use refetch to reload user data
	const [isCanceling, setIsCanceling] = useState(false);

	// Effect to refetch user data after returning from Stripe
	useEffect(() => {
		if (isCanceling) {
			refetch().then(() => {
				setIsCanceling(false); // Reset canceling state after refetch
			});
		}
	}, [isCanceling, refetch]);

	if (isLoading) {
		return <></>;
	}

	const handleBilling = async () => {
		if (user?.subscription?.customer_id) {
			setIsCanceling(true); // Set canceling state

			const data = JSON.parse(await manageBilling(user?.subscription?.customer_id));

			window.location.href = data.url; // Redirect to billing portal
		}
	};

	return (
		<div className='space-y-5'>
			<h1 className='text-3xl font-bold'>Hi, {user?.display_name}</h1>

			{user?.subscription?.end_at && (
				<p>Your subscription will end on {""}
					{new Date(user?.subscription?.end_at).toDateString()}
				</p>
			)}

			{user?.subscription?.customer_id ? (
				<Button
					onClick={handleBilling}
					disabled={isCanceling || !user?.subscription?.customer_id} // Disable button when canceling or customer_id is null
				>
					{isCanceling ? "Processing..." : "Cancel Subscription"}
				</Button>
			) : null} {/* Added this closing part for the conditional rendering */}

		</div>
	);
}
