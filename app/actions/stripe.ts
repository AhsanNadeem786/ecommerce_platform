'use server';

import { stripe } from '@/lib/stripe';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import cart from '@/models/cart';
export async function createCheckoutSession() {
  const cokkieStore = await cookies()
  const token = cokkieStore.get("token")?.value

  if (!token) throw new Error("No token found");


  const decoded = jwt.verify(token, 'screct-key')
  const userId = decoded.userId;
  const productCart = await cart.find({ UserId: userId }).populate("ProductId").lean();

  const lineItems = productCart.map((data) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: data.ProductId.name,
          images: data.ProductId.images,
          description: data.ProductId.description,
          metadata: {
            productId: data.ProductId._id.toString(),
          }
        },
        unit_amount: Math.round(data.ProductId.price * 100), // Converts dollars to cents (e.g., 25.50 -> 2550)
      },
      quantity: 1,
    }
  })


  console.log("lineItems", JSON.stringify(lineItems));

  try {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:lineItems,
      mode: 'payment',
      metadata: {
        user_id: userId,
       
      
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
    });


    // return { url: null };
    return { url: session.url };
  } catch (error) {
    console.error('Stripe Session Error:', error);
    throw new Error('Failed to create checkout session.');
  }
}
