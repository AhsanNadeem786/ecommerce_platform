import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Payment from "@/models/payment"
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });
    console.log("lineItems", JSON.stringify(lineItems));
    
    const paymentData = {
      checkoutSessionId:session.id,

      amount:session.amount_total,
      paymentStatus:session.payment_status,
      userId:session.metadata?.user_id
    }
    const paymentRow =  await Payment.create(paymentData);
    console.log("paymentRow",paymentRow);
    
    
    // console.log("lineItems", JSON.stringify(lineItems));

    // Fulfill the order: update user account, trigger emails, etc.
    console.log(`Payment successful for Session ID: ${session.id}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}