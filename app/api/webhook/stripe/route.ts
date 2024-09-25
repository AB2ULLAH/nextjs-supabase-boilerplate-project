/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import { supabaseAdmin } from "@/lib/supabase/admin";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: any) {
	const rawBody = await buffer(req.body);
	try {
		const sig = headers().get("stripe-signature");
		let event;
		try {
			event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
		} catch (err: any) {
			return Response.json({ error: `Webhook Error: ${err?.message ?? 'Unknown error'}` });
		}

		switch (event.type) {
			case "invoice.payment_succeeded":
				const result = event.data.object;
				console.log(event.data.object);
				const supabase = await supabaseAdmin();
				const customer_id = result.customer as string;
				const subscription_id = result.subscription as string;
				const end_at = new Date(result.lines.data[0].period.end * 1000).toISOString();
				const email = result.customer_email as string;
				console.log("Extracted Fields:", { customer_id, subscription_id, end_at, email });

				// Update subscription directly in this block
				const { error } = await supabase.from("subscription").update({
					customer_id: result.customer as string,
					subscription_id: result.subscription as string,
					end_at: new Date(result.lines.data[0].period.end * 1000).toISOString(),
				}).eq("email", email);

				if (error) {
					console.log("Error updating subscription in database:", error); // Log specific error
					return Response.json({ error: "Webhook Error: Database update failed" });
				}
				break;

			case "customer.subscription.updated":
				const deleteSubscription = event.data.object;
				console.log("Subscription deletion event received:", deleteSubscription);
				const cancelError = await onSubCancel(deleteSubscription.id);
				if (cancelError) {
					console.log("Error while canceling subscription:", cancelError);
					return Response.json({ error: cancelError.message });
				}
				console.log("Subscription successfully canceled.");
				break;

			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		return Response.json({});
	} catch (e) {
		return Response.json({ error: "Webhook Error: " + (e as Error).message });
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function onPpaymentSucceeded(end_at: string,
	customer_id: string,
	subscription_id: string,
	email: string) {
	const supabase = await supabaseAdmin();
	const { error } = await supabase
		.from("subscription")
		.update({
			end_at,
			customer_id,
			subscription_id,
		})
		.eq("email", email);

	console.log("Supabase update response:", { error }); // Log the response
	return error;
}

async function onSubCancel(
	subscription_id: string
) {
	const supabase = await supabaseAdmin();
	const { error } = await supabase
		.from("subscription")
		.update({
			customer_id: null,
			subscription_id: null,
		})
		.eq("subscription_id", subscription_id);
	return error;
}
