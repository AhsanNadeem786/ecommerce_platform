import dbConnect from "@/lib/dbConnect";
import addcart from "@/models/addcart";
import cart from "@/models/cart";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        const addCart = await addcart.create({
            name: body.name,
            email: body.email,
            password: body.password
        });
        if (!addCart) {
            return Response.json({ error: "Failed to create product" }, { status: 500 });
        }
        return Response.json({ message: "Product created successfully", data: addCart }, { status: 201 });
    } catch (error) {
        console.log(error);

        return Response.json({ error: "Failed to create product" }, { status: 500 });

    }

}


export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "No token found" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, "screct-key") as {
            userId: string;
        };

        const deleteCart = await cart.deleteMany({
            UserId: decoded.userId,
        });

        return NextResponse.json(
            { success: "Cart deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: "Failed to delete cart" },
            { status: 500 }
        );
    }
}
