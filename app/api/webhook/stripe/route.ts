import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import Payment from "@/models/payment";
import Order from "@/models/order";
import address from "@/models/address";
import orderaddress from "@/models/orderaddress";
import cart from "@/models/cart";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const userId = session.metadata?.user_id;

    // Save payment
    const paymentRow = await Payment.create({
      checkoutSessionId: session.id,
      amount: session.amount_total,
      paymentStatus: session.payment_status,
      userId,
    });

    // Prepare products
    const ProductData = lineItems.data.map((item) => {
      const stripeProduct = item.price?.product as Stripe.Product;

      return {
        id: stripeProduct.metadata.productId,
        price: item.amount_total,
      };
    });

    // Save order
    const orders = await Order.create({
      products: ProductData,
      status: "pending",
      paymentId: paymentRow._id,
      userId,
    });

    // Get address
    const addresses = await address.findOne({ userId });

    if (addresses) {
      await orderaddress.create({
        userId: addresses.userId,
        name: addresses.name,
        lastname: addresses.lastname,
        country: addresses.country,
        city: addresses.city,
        street: addresses.street,
        orderId: orders._id,
      });
    }

    // Delete cart
    await cart.deleteMany({
      UserId: userId,
    });

    console.log(`Payment successful for Session ID: ${session.id}`);
  }

  return NextResponse.json(
    {
      received: true,
    },
    {
      status: 200,
    }
  );
}