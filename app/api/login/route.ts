
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        console.log(body);
        const { email, password } = body
        const user = await User.find({  email, password }).lean()
          const payload = {
            firstName:user.firstName,
            lastname:user.lastname,
            email,
          }
            
        if (!user) {
            return Response.json({ error: "Failed to User created" }, { status: 500 });
        }
        const token = jwt.sign(payload,"screct-key",{
            expiresIn:'24h',
        })
        const response = NextResponse.json({ message: "login successfull", data: user }, { status: 201 });
        response.cookies.set("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:"strict",
            maxAge:3600,
            path:"/"
        })
        return response
    } catch (error) {
        console.log(error);

        return Response.json({ error: "Failed to User created" }, { status: 500 });

    }
}