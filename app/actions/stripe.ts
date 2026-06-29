'use server';

import { stripe } from '@/lib/stripe';

export async function createCheckoutSession(amount: number) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Store Order Purchase', // Generic name shown on checkout page
            },
            unit_amount: Math.round(amount * 100), // Converts dollars to cents (e.g., 25.50 -> 2550)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // metadata: {
      //   user_id: 'usr_98765',
      //   order_id: 'ord_12345',
      //   internal_note: 'This is a test payment'
      // },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Stripe Session Error:', error);
    throw new Error('Failed to create checkout session.');
  }
}
