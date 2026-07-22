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

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse(
      "Missing Stripe signature",
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe Webhook Error:", err.message);

    return new NextResponse(
      `Webhook Error: ${err.message}`,
      {
        status: 400,
      }
    );
  }

  // ==========================================
  // CHECKOUT SESSION COMPLETED
  // ==========================================

  if (event.type === "checkout.session.completed") {
    try {
      const session =
        event.data.object as Stripe.Checkout.Session;

      console.log(
        "Checkout Session Completed:",
        session.id
      );

      // ==========================================
      // USER ID
      // ==========================================

      const userId = session.metadata?.user_id;

      if (!userId) {
        console.error(
          "User ID not found in Stripe metadata"
        );

        return NextResponse.json(
          {
            error: "User ID not found",
          },
          {
            status: 400,
          }
        );
      }

      // ==========================================
      // GET STRIPE LINE ITEMS
      // ==========================================

      const lineItems =
        await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            expand: ["data.price.product"],
          }
        );

      // ==========================================
      // PAYMENT STATUS
      // ==========================================

      let paymentStatus:
        | "Pending"
        | "paid"
        | "Failed";

      if (session.payment_status === "paid") {
        paymentStatus = "paid";
      } else if (
        session.payment_status === "unpaid"
      ) {
        paymentStatus = "Pending";
      } else {
        paymentStatus = "Pending";
      }

      // ==========================================
      // PAYMENT AMOUNT
      // ==========================================

      const amount = session.amount_total ?? 0;

      // ==========================================
      // SAVE PAYMENT
      // ==========================================

      const paymentRow = await Payment.create({
        checkoutSessionId: session.id,
        amount: amount,
        paymentStatus: paymentStatus,
        userId: userId,
      });

      console.log(
        "Payment saved:",
        paymentRow._id
      );

      // ==========================================
      // PREPARE PRODUCTS
      // ==========================================

      const ProductData = lineItems.data
        .map((item) => {
          const stripeProduct =
            item.price?.product as Stripe.Product;

          if (!stripeProduct) {
            return null;
          }

          return {
            id: stripeProduct.metadata.productId,
            price: item.amount_total ?? 0,
          };
        })
        .filter(Boolean);

      // ==========================================
      // SAVE ORDER
      // ==========================================

      const orders = await Order.create({
        products: ProductData,
        status: "pending",
        paymentId: paymentRow._id.toString(),
        userId: userId,
      });

      console.log(
        "Order created:",
        orders._id
      );

      // ==========================================
      // GET USER ADDRESS
      // ==========================================

      const addresses =
        await address.findOne({
          userId: userId,
        });

      // ==========================================
      // SAVE ORDER ADDRESS
      // ==========================================

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

        console.log(
          "Order address saved"
        );
      } else {
        console.log(
          "No shipping address found"
        );
      }

      // ==========================================
      // DELETE CART
      // ==========================================

      await cart.deleteMany({
        UserId: userId,
      });

      console.log(
        "Cart deleted for user:",
        userId
      );

      console.log(
        `Payment successful for Session ID: ${session.id}`
      );

    } catch (error) {
      console.error(
        "Webhook processing error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Webhook processing failed",
        },
        {
          status: 500,
        }
      );
    }
  }

  // ==========================================
  // RETURN SUCCESS
  // ==========================================

  return NextResponse.json(
    {
      received: true,
    },
    {
      status: 200,
    }
  );
}