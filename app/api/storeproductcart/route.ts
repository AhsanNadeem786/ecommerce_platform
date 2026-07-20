



// 👈 Populating ke liye Product model lazmi load karein
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import dbConnect from "@/lib/dbConnect";

import cart from "@/models/cart";
export async function GET() {
    await dbConnect();
    
    // 👇 Poore logical code ko try/catch ke andar rakhna zaroori hai
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ success: false, message: "No token found" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'screct-key') as { userId: string };
        } catch (jwtError) {
            return Response.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
        }

        // 👇 Cart model aur Product dependency dono load ho chuki hain
        const CartDATA = await cart.find({
            UserId: decoded.userId
        }).populate("ProductId").lean();

        return Response.json({ success: true, message: "Products fetched successfully", data: CartDATA }, { status: 200 });
        
    } catch (error: any) {
        console.error("Cart API Error:", error);
        return Response.json({ 
            success: false, 
            error: "Failed to fetch products", 
            message: error.message 
        }, { status: 500 });
    }
}
