"use server";

import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cart from "@/models/cart";
import address from "@/models/address";
import dbConnect from "@/lib/dbConnect";

interface Product {
  _id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
}

interface CartItem {
  _id: string;
  ProductId: Product;
  UserId: string;
}

export async function createCheckoutSession() {
  try {
    await dbConnect();

    // ----------------------------
    // Get Token
    // ----------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        url: null,
        error: "Please login first.",
      };
    }

    // ----------------------------
    // Verify JWT
    // ----------------------------
    const decoded = jwt.verify(token, "screct-key") as {
      userId: string;
    };

    const userId = decoded.userId;

    // ----------------------------
    // Check Address
    // ----------------------------
    const addressed = await address.findOne({ userId }).lean();

    if (!addressed) {
      return {
        url: null,
        error: "Please add your shipping address.",
      };
    }

    // ----------------------------
    // Get Cart Products
    // ----------------------------
    const productCart = (await cart
      .find({ UserId: userId })
      .populate("ProductId")
      .lean()) as unknown as CartItem[];

    if (!productCart.length) {
      return {
        url: null,
        error: "Your cart is empty.",
      };
    }

    // ----------------------------
    // Debug Logs
    // ----------------------------
    console.log("==================================");
    console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log(
      "Stripe Key:",
      process.env.STRIPE_SECRET_KEY ? "FOUND" : "MISSING"
    );
    console.log("User:", userId);
    console.log("Cart:", JSON.stringify(productCart, null, 2));

    // ----------------------------
    // Create Stripe Line Items
    // ----------------------------
    const lineItems = productCart.map((item) => {
      const product = item.ProductId;

      if (!product) {
        throw new Error("Product not found.");
      }

      return {
        price_data: {
          currency: "usd",

          product_data: {
            name: product.name || "Product",

            description: product.description || "",

            images:
              Array.isArray(product.images) &&
              product.images.length > 0
                ? product.images
                : [],

            metadata: {
              productId: product._id.toString(),
            },
          },

          unit_amount: Math.round(Number(product.price) * 100),
        },

        quantity: 1,
      };
    });

    console.log(
      "LINE ITEMS:",
      JSON.stringify(lineItems, null, 2)
    );

    // ----------------------------
    // Create Stripe Session
    // ----------------------------
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: lineItems,

      metadata: {
        user_id: userId,
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    console.log("SESSION CREATED");
    console.log(session);

    return {
      url: session.url,
      error: null,
    };
  } catch (error: any) {
    console.log("==================================");
    console.log("STRIPE ERROR");
    console.log(error);
    console.log("Message:", error?.message);
    console.log("Type:", error?.type);
    console.log("Code:", error?.code);
    console.log("Raw:", error?.raw);
    console.log("==================================");

    return {
      url: null,
      error: error?.message || "Failed to create checkout session.",
    };
  }
}