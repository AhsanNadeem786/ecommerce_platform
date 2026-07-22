import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";
import Product from "@/models/createproduct"; // IMPORTANT

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    await dbConnect();

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json(
                { success: false, message: "No token found" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "screct-key"
        ) as { userId: string };

        const cartData = await Cart.find({
            UserId: decoded.userId,
        })
            .populate("ProductId")
            .lean();

        return Response.json(
            {
                success: true,
                data: cartData,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);

        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}