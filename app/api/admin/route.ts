import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// =========================
// Nodemailer Transporter
// =========================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// =========================
// POST API
// =========================

export async function POST(request: Request) {
    try {
        // Connect Database
        await dbConnect();

        // Get request body
        const { userSatus } = await request.json();

        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // Check token
        if (!token) {
            return Response.json(
                {
                    error: "Unauthorized: No token found",
                },
                {
                    status: 401,
                }
            );
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            "screct-key"
        ) as {
            userId: string;
        };

        // =========================
        // Update User Status
        // =========================

        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            {
                userStatus: "active",
            },
            {
                new: true,
            }
        );

        // Check User
        if (!updatedUser) {
            return Response.json(
                {
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        // =========================
        // Send Email
        // =========================

        if (
            userSatus === "active" &&
            updatedUser.email
        ) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,

                to: updatedUser.email,

                subject: "Account Status Activated",

                text: `Hello ${updatedUser.firstName} ${updatedUser.lastname},

Your user status has been successfully updated to active.`,

                html: `
                    <p>
                        Hello 
                        <b>
                            ${updatedUser.firstName} ${updatedUser.lastname}
                        </b>,
                    </p>

                    <p>
                        Your user status has been successfully updated to 
                        <b>active</b>.
                    </p>
                `,
            });
        }

        // =========================
        // Success Response
        // =========================

        return Response.json(
            {
                message:
                    "User status activated successfully",

                data: updatedUser,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "API Route Error:",
            error
        );

        // JWT Error
        if (
            error instanceof jwt.JsonWebTokenError
        ) {
            return Response.json(
                {
                    error:
                        "Unauthorized: Invalid token",
                },
                {
                    status: 401,
                }
            );
        }

        // General Error
        return Response.json(
            {
                error:
                    "Failed to update user status",
            },
            {
                status: 500,
            }
        );
    }
}