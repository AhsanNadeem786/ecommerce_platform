// app/api/storeproductcart/route.ts
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();
    
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ success: false, message: "No token found" }, { status: 401 });
        }

        let decoded: { userId: string };
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'screct-key') as { userId: string };
        } catch (jwtError) {
            return Response.json({ success: false, message: "Invalid token" }, { status: 401 });
        }

        // 🔥 CRITICAL FIX: Direct string extraction to bypass Model Compilation issues
        const CartModel = mongoose.models.Cart || mongoose.model("Cart");
        
        // Ensure Product target exists in memory before execution
        if (!mongoose.models.Product) {
            return Response.json({ success: false, message: "Product context target missing" }, { status: 500 });
        }

        const CartDATA = await CartModel.find({
            UserId: decoded.userId
        }).populate({
            path: "ProductId",
            model: mongoose.models.Product // Force exact model instance validation
        }).lean();

        return Response.json({ success: true, data: CartDATA }, { status: 200 });
        
    } catch (error: any) {
        // Return explicit internal string stack to capture exact serverless trace
        return Response.json({ 
            success: false, 
            error: "Execution Failure", 
            message: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
}
