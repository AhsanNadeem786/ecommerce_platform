import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Payment from "@/models/payment"
import Order from '@/models/order';
import address from '@/models/address';
import orderaddress from '@/models/orderaddress';
import cart from '@/models/cart';
export async function POST(req: NextRequest) {
  let products = []
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
    // console.log("lineItems", JSON.stringify(lineItems));
    const userId = session.metadata?.user_id;
    const paymentData = {
      checkoutSessionId: session.id,

      amount: session.amount_total,
      paymentStatus: session.payment_status,
      userId:userId
    }
    const paymentRow = await Payment.create(paymentData);
    console.log("paymentRow", paymentRow);
    // const paymentId = await Payment.findById('_id').lean()
    // console.log("paymentId", paymentId);
    const ProductData = lineItems.data.map((product) => {
      return {

        id: product.price?.product?.metadata.productId,
        price: product.amount_total,


      }
    })

    console.log("ProductData", ProductData);

    const orderData = {
      products:ProductData,
      status: "pending",
      paymentId: paymentRow._id,
      userId:userId
    }
    console.log("orderData", orderData);

    const orders = await Order.create(orderData)
    console.log("orders",orders);
    const addresses = await address.findOne({userId}) 
    console.log("addresses",addresses);
    
    const orderaddres = {
      userId:addresses.userId,
      name:addresses.name,
      lastname:addresses.lastname,
      country:addresses.country,
      city:addresses.city,
      street:addresses.street,
      orderId:orders._id
    }
   const orderAddresses = await orderaddress.create(orderaddres)
   console.log("orderAddresses",orderAddresses);
   
   const deleteCart = await cart.deleteMany({UserId:userId})
    console.log("deleteCart",deleteCart);
    
    
    console.log(`Payment successful for Session ID: ${session.id}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}