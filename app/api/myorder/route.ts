import dbConnect from "@/lib/dbConnect";
import jwt from 'jsonwebtoken';
import Order from "@/models/order";
import Products from "@/models/createproduct";
import { cookies } from "next/headers";
export async function GET() {
    await dbConnect();

    try {
        const cokkieStore = await cookies()
        const token = cokkieStore.get("token")?.value

        if (!token) throw new Error("No token found");


        const decoded = jwt.verify(token, 'screct-key')
        const userId = decoded.userId
        const orderData = await Order.find({ userId }).populate({ path: 'products.id', model: Products }).lean()
        return Response.json({ message: "Order fetched successfully", data: orderData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}