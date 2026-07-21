"use server";

import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cart from "@/models/cart";
import address from "@/models/address";

// Product type
interface Product {
  _id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
}

// Cart type
interface CartItem {
  _id: string;
  ProductId: Product;
  UserId: string;
}

export async function createCheckoutSession() {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        url: null,
        error: "Please login first.",
      };
    }

    // =========================
    // 2. Verify JWT Token
    // =========================

    const decoded = jwt.verify(
      token,
      "screct-key"
    ) as {
      userId: string;
    };

    const userId = decoded.userId;


    const addressed = await address
      .findOne({ userId })
      .lean();

    if (!addressed) {
      return {
        url: null,
        error: "Please add your shipping address.",
      };
    }


    const productCart = (await cart
      .find({ UserId: userId })
      .populate("ProductId")
      .lean()) as unknown as CartItem[];


    if (!productCart || productCart.length === 0) {
      return {
        url: null,
        error: "Your cart is empty.",
      };
    }

    const lineItems = productCart.map((data) => {
      const product = data.ProductId;

      return {
        price_data: {
          currency: "usd",

          product_data: {
            name: product.name,

            images:
              product.images &&
              product.images.length > 0
                ? product.images
                : undefined,

            description: product.description,

            metadata: {
              productId: product._id.toString(),
            },
          },

          // Stripe accepts amount in cents
          unit_amount: Math.round(
            product.price * 100
          ),
        },

        // One quantity per cart item
        quantity: 1,
      };
    });

    // =========================
    // 7. Create Stripe Session
    // =========================

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: lineItems,

        mode: "payment",

        // User ID will be available
        // inside Stripe webhook
        metadata: {
          user_id: userId,
        },

        // After successful payment
        success_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}` +
          `/success?session_id={CHECKOUT_SESSION_ID}`,

        // If payment cancelled
        cancel_url:
          `${process.env.NEXT_PUBLIC_BASE_URL}` +
          `/checkout`,
      });

    // =========================
    // 8. Return Stripe URL
    // =========================

    return {
      url: session.url,
      error: null,
    };
  } catch (error) {
    console.error(
      "Stripe Checkout Session Error:",
      error
    );

    return {
      url: null,
      error:
        "Failed to create checkout session.",
    };
  }
}