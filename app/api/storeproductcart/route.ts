import dbConnect from "@/lib/dbConnect";
import cart from "@/models/cart";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
export async function GET() {
    await dbConnect();
    const cokkieStore = await cookies()
    const token = cokkieStore.get("token")?.value

    if (!token) throw new Error("No token found");


    const decoded = jwt.verify(token, 'screct-key')
   
    try {

        const CartDATA = await cart.find({

            UserId: decoded.userId
        }).populate("ProductId",).lean()
        console.log("CartDATA", CartDATA);



        return Response.json({ message: "Products fetched successfully", data: CartDATA }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}