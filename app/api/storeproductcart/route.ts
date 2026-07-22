import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import "@/models/createproduct"; // Register Product model

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // Connect Database
    await dbConnect();

    // Get Token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "No token found",
        },
        { status: 401 }
      );
    }

    // Verify Token
    let decoded: any;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "screct-key"
      );
    } catch (err: any) {
      return Response.json(
        {
          success: false,
          message: "Invalid Token",
          error: err.message,
        },
        { status: 401 }
      );
    }

    console.log("UserId:", decoded.userId);

    // Fetch Cart
    const cartData = await Cart.find({
      UserId: decoded.userId,
    })
      .populate({
        path: "ProductId",
      })
      .lean();

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
    console.error("STORE PRODUCT CART ERROR");
    console.error(error);

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