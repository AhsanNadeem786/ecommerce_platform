import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import Product from "@/models/createproduct"; // IMPORTANT

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        // Step 1: Verify environment variables
        if (!process.env.MONGODB_URI) {
            console.error("[STOREPRODUCTCART] CRITICAL: MONGODB_URI is not set");
            return Response.json(
                { success: false, message: "Database configuration missing" },
                { status: 500 }
            );
        }

        if (!process.env.JWT_SECRET) {
            console.warn("[STOREPRODUCTCART] WARNING: JWT_SECRET not set, using fallback");
        }

        // Step 2: Connect to database
        console.log("[STOREPRODUCTCART] Connecting to database...");
        await dbConnect();
        console.log("[STOREPRODUCTCART] Database connection successful");

        // Step 3: Get and verify token
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            console.warn("[STOREPRODUCTCART] No token found in cookies");
            return Response.json(
                { success: false, message: "No token found" },
                { status: 401 }
            );
        }

        // Step 4: Verify JWT
        let decoded: any;
        try {
            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || "screct-key"
            ) as { userId: string };
            console.log("[STOREPRODUCTCART] Token verified successfully");
        } catch (jwtError: any) {
            console.error("[STOREPRODUCTCART] JWT verification failed:", jwtError.message);
            return Response.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        }

        // Step 5: Fetch cart data
        console.log("[STOREPRODUCTCART] Fetching cart for userId:", decoded.userId);
        const cartData = await Cart.find({
            UserId: decoded.userId,
        })
            .populate("ProductId")
            .lean();

        console.log("[STOREPRODUCTCART] Cart data retrieved successfully, count:", cartData.length);

        return Response.json(
            {
                success: true,
                data: cartData,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("[STOREPRODUCTCART] UNHANDLED ERROR:", {
            message: error?.message,
            name: error?.name,
            code: error?.code,
            stack: error?.stack,
        });

        // Determine if it's a database error or other error
        const isDatabaseError = error?.message?.includes("connect") || 
                               error?.name === "MongoError" ||
                               error?.code === 13;

        return Response.json(
            {
                success: false,
                message: isDatabaseError 
                    ? "Database connection failed" 
                    : "Internal server error",
                ...(process.env.NODE_ENV === "development" && {
                    debug: error?.message,
                }),
            },
            { status: 500 }
        );
    }
}