import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userStatus } = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { error: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      "screct-key"
    ) as { userId: string };

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        userStatus: "failed",
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Send email only when status is failed
    if (userStatus === "failed" && updatedUser.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updatedUser.email,
        subject: "Account Status Update",

        text: `Hello ${updatedUser.firstName},

Your account status has been changed to failed.

Please add more information to your account and try again.

Thank you.`,

        html: `
          <p>Hello <b>${updatedUser.firstName}</b>,</p>

          <p>
            Your account status has been changed to 
            <b>failed</b>.
          </p>

          <p>
            Please add more information to your account
            and try again.
          </p>

          <p>Thank you.</p>
        `,
      });
    }

    return Response.json(
      {
        message: "User status updated successfully",
        data: updatedUser,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error("API Route Error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return Response.json(
        {
          error: "Unauthorized: Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        error: "Failed to update user status",
      },
      {
        status: 500,
      }
    );
  }
}