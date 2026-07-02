import dbConnect from "@/lib/dbConnect";
import address from "@/models/address";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
export async function POST(request: Request) {
    await dbConnect();
    const cokkieStore = await cookies()
    const token = cokkieStore.get("token")?.value

    if (!token) throw new Error("No token found");


    const decoded = jwt.verify(token, 'screct-key')
    const userId = decoded.userId


    try {
        const body = await request.json();


        const addressData = await address.create({
            // userId:decoded.userId,
            userId,
            name: body.name,
            lastname: body.lastname,
            city: body.city,
            country: body.country,
            street: body.street,
        });
        console.log("addressData", addressData);

        if (!addressData) {
            return Response.json({ error: "Failed to User created" }, { status: 500 });
        }
        return Response.json({ message: "User created successfully", data: addressData }, { status: 201 });
    } catch (error) {
        console.log(error);

        return Response.json({ error: "Failed to User created" }, { status: 500 });

    }

}
export async function GET() {
    await dbConnect();
    const cokkieStore = await cookies()
    const token = cokkieStore.get("token")?.value

    if (!token) throw new Error("No token found");


    const decoded = jwt.verify(token, 'screct-key')
    const userId = decoded.userId

    try {

        const Address = await address.findOne({ userId });
        return Response.json({ message: "Address fetched successfully", data: Address }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch Address" }, { status: 500 });
    }
}



export async function PUT(request: Request) {
    await dbConnect()
    const cokkieStore = await cookies()
    const token = cokkieStore.get("token")?.value

    if (!token) throw new Error("No token found");


    const decoded = jwt.verify(token, 'screct-key')
    const userId = decoded.userId
    console.log(userId);

    try {



        const body = await request.json();


        const updatecaterogy = await address.findOneAndUpdate({userId}, {
            name: body.name,
            lastname: body.lastname,
            city: body.city,
            country: body.country,
            street: body.street
        },{
            upsert:true,
            new:true
        })

        if (!updatecaterogy) {
            return Response.json({ error: "Failed to update category" }, { status: 500 });
        }
        return Response.json({ message: "Category updated successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to update category" }, { status: 500 });

    }
}