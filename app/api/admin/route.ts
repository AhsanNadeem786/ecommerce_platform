import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userSatus } = await request.json();
    const cokkieStore = await cookies()
    const token = cokkieStore.get("token")?.value

    if (!token) throw new Error("No token found");


    const decoded = jwt.verify(token, 'screct-key')







    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { userStatus: 'active' },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    if (userSatus === 'active' && updatedUser.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updatedUser.email,
        subject: "Account Status Activated",
        text: `Hello ${updatedUser.name},\n\nYour user status has been successfully updated to active.`,
        html: `<p>Hello <b>${updatedUser.name}</b>,</p><p>Your user status has been successfully updated to <b>active</b>.</p>`,
      });
    }


    return Response.json(
      { message: "User status activated successfully", data: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error("API Route Error:", error);


    if (error instanceof jwt.JsonWebTokenError) {
      return Response.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    return Response.json({ error: "Failed to update user status" }, { status: 500 });
  }
}
