import dbConnect from "@/lib/dbConnect";
import product from "@/models/createproduct";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        const productData = await product.create({
            images: body.images,
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

export async function GET() {
    await dbConnect();
    try {
        const cokkieStore = await cookies()
        const token = cokkieStore.get("token")?.value

        if (!token) throw new Error("No token found");


        const decoded = jwt.verify(token, 'screct-key') as { userId: string }
        const userId = decoded.userId;
        const productData = await product.find()

// .populate("categoryId").populate({
//             path: "isCart",
//             match: { UserId: userId }
//         })

        return Response.json({ message: "Products fetched successfully", data: productData }, { status: 200 });
    } catch (error: any) {
        console.error("GET /api/create-product Error:", error);

        return Response.json(
            {
                success: false,
                message: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}