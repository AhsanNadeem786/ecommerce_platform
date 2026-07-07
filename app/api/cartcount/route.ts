import dbConnect from "@/lib/dbConnect";
import cart from "@/models/cart";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
export async function GET() {
    await dbConnect();


    try {
        const cokkieStore = await cookies()
        const token = cokkieStore.get("token")?.value

        if (!token) throw new Error("No token found");


        const decoded = jwt.verify(token, 'screct-key')
        const userId = decoded.userId

        const CartCount = await cart.countDocuments({ UserId:userId })
        return Response.json({ message: "Cart Count fetched successfully", data: CartCount }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch Cart Count" }, { status: 500 });
    }
}