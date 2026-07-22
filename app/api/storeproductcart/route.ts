import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import Product from "@/models/createproduct"; // IMPORTANT

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getCartData(token: string | undefined) {
    // Verify token exists
    if (!token) {
        console.warn("[STOREPRODUCTCART] No token found in cookies");
        return {
            success: false,
            message: "No token found",
            status: 401,
        };
    }

    // Verify JWT
    let decoded: any;
    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "screct-key"
        ) as { userId: string };
        console.log("[STOREPRODUCTCART] Token verified successfully for userId:", decoded.userId);
    } catch (jwtError: any) {
        console.error("[STOREPRODUCTCART] JWT verification failed:", jwtError.message);
        return {
            success: false,
            message: "Invalid token",
            status: 401,
        };
    }

    // Fetch cart data
    console.log("[STOREPRODUCTCART] Fetching cart for userId:", decoded.userId);
    try {
        const cartData = await Cart.find({
            UserId: decoded.userId,
        })
            .populate("ProductId")
            .lean();

        console.log("[STOREPRODUCTCART] Cart data retrieved successfully, count:", cartData.length);

        return {
            success: true,
            data: cartData,
            status: 200,
        };
    } catch (dbError: any) {
        console.error("[STOREPRODUCTCART] Database query error:", {
            message: dbError?.message,
            name: dbError?.name,
        });
        return {
            success: false,
            message: "Failed to fetch cart data",
            status: 500,
        };
    }
}

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

        // Step 2: Connect to database
        console.log("[STOREPRODUCTCART] Connecting to database...");
        try {
            await dbConnect();
            console.log("[STOREPRODUCTCART] Database connection successful");
        } catch (dbConnectError: any) {
            console.error("[STOREPRODUCTCART] Database connection failed:", dbConnectError.message);
            return Response.json(
                { success: false, message: "Database connection failed" },
                { status: 500 }
            );
        }

        // Step 3: Get and verify token
        let token: string | undefined;
        try {
            console.log("[STOREPRODUCTCART] Attempting to get cookies...");
            const cookieStore = await cookies();
            token = cookieStore.get("token")?.value;
            console.log("[STOREPRODUCTCART] Cookies retrieved, token exists:", !!token);
        } catch (cookieError: any) {
            console.error("[STOREPRODUCTCART] Error getting cookies:", cookieError.message);
            return Response.json(
                { success: false, message: "Failed to retrieve authentication" },
                { status: 500 }
            );
        }

        // Step 4: Get cart data
        const result = await getCartData(token);
        
        return Response.json(
            { success: result.success, data: result.data, message: result.message },
            { status: result.status }
        );
    } catch (error: any) {
        console.error("[STOREPRODUCTCART] UNHANDLED ERROR:", {
            message: error?.message,
            name: error?.name,
            code: error?.code,
            stack: error?.stack?.substring(0, 500), // Limit stack trace length
        });

        return Response.json(
            {
                success: false,
                message: "Internal server error",
                ...(process.env.NODE_ENV === "development" && {
                    debug: error?.message,
                }),
            },
            { status: 500 }
        );
    }
}

// Also handle POST requests (in case frontend sends POST)
export async function POST() {
    return GET();
}