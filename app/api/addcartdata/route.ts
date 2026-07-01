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


export async function DELETE(request: Request,

    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect()
    try {
        const cokkieStore = await cookies()
        const token = cokkieStore.get("token")?.value

        if (!token) throw new Error("No token found");


        const decoded = jwt.verify(token, 'screct-key')


        const DeleteCart = await cart.deleteMany({
            UserId: decoded.userId
        })


        if (!DeleteCart) {
            return NextResponse.json({ error: "failed to deleted" }, { status: 500 })
        }

        return NextResponse.json({ Success: "cart was  deleted" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "failed to deleted" }, { status: 500 })
    }
}