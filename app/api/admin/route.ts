import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {

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
