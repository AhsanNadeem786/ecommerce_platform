import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import "@/models/createproduct"; // Register Product model

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    console.log("========== STORE PRODUCT CART ==========");

    // Connect MongoDB
    console.log("Connecting database...");
    await dbConnect();
    console.log("Database connected");

    // Get token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log("Token not found");

      return Response.json(
        {
          success: false,
          message: "No token found",
        },
        {
          status: 401,
        }
      );
    }

    // Verify JWT
    let decoded: any;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "screct-key"
      );

      console.log("JWT verified");
      console.log(decoded);
    } catch (err: any) {
      console.error("JWT Error:", err);

      return Response.json(
        {
          success: false,
          message: "Invalid Token",
          error: err.message,
        },
        {
          status: 401,
        }
      );
    }

    // Find Cart
    console.log("Finding Cart...");

    const cartData = await Cart.find({
      UserId: decoded.userId,
    })
      .populate({
        path: "ProductId",
      })
      .lean();

    console.log("Cart Found:", cartData.length);

    return Response.json(
      {
        success: true,
        data: cartData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("========= API ERROR =========");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    return Response.json(
      {
        success: false,
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST() {
  return GET();
}