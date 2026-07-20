import dbConnect from "@/lib/dbConnect";
import product from "@/models/createproduct";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import cart from "@/models/cart";
import Category from "@/models/Category"; // 2. Register Cart second
import Product from "@/models/createproduct";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        const productData = await product.create({
            images:body.images,
            name: body.productName,
            price: body.price,
            quantity: body.quantity,
            categoryId: body.categoryId,
            description: body.description,
        });
        if (!productData) {
            return Response.json({ error: "Failed to create product" }, { status: 500 });
        }
        return Response.json({ message: "Product created successfully", data: productData }, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: "Failed to create product" }, { status: 500 });

    }
    
}
 
 



// 🔥 CRITICAL LIVE IMPORT SEQUENCE: Pehle models load honge bad mein Product main queries
  // Final compilation initialization

// 🔥 CRITICAL LIVE SYSTEM FIX: Pehle models manually load honge phir query chalegi
   // 3. Main Product query file

export async function GET() {
    await dbConnect();
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
            return Response.json({ success: false, message: "No token found" }, { status: 401 });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'screct-key') as { userId: string };
        const userId = decoded.userId;
        
        // Context loading sequence fix
        const productData = await Product.find()
            .populate({
                path: "categoryId",
                model: Category // 👈 Direct model component assign karein taake string search fail na ho
            })
            .populate({
                path: "isCart",
                match: { UserId: userId },
                model: cart // 👈 Direct model component assign karein
            });
        
        return Response.json({ success: true, message: "Products fetched successfully", data: productData }, { status: 200 });
    } catch (error: any) {
        console.error("GET /api/create-product Error:", error);
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}

