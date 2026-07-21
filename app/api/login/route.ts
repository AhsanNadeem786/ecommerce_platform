import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();


    try {
        const body = await request.json();

        const { email, password } = body;

        // Check required fields
        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Email and password are required",
                },
                {
                    status: 400,
                }
            );
        }

        // Find user only by email
        const user = await User.findOne({ email }).lean();

        // User not found
        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid email or password",
                },
                {
                    status: 401,
                }
            );
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        // Password incorrect
        if (!isPasswordCorrect) {
            return NextResponse.json(
                {
                    error: "Invalid email or password",
                },
                {
                    status: 401,
                }
            );
        }

        // JWT payload
        const payload = {
            userId: user._id.toString(),
            firstName: user.firstName,
            lastname: user.lastname,
            email: user.email,
        };

        // Create JWT token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || "screct-key",
            {
                expiresIn: "24h",
            }
        );

        // Create response
        const response = NextResponse.json(
            {
                message: "Login successful",
                data: {
                    id: user._id,
                    firstName: user.firstName,
                    lastname: user.lastname,
                    email: user.email,
                },
            },
            {
                status: 200,
            }
        );

        // Save JWT in HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                error: "Something went wrong during login",
            },
            {
                status: 500,
            }
        );
    }


}
