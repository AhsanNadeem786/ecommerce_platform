import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "./models/User";

export default async function Proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    // ==========================================
    // E-COMMERCE PROTECTION
    // ==========================================

    if (
        request.nextUrl.pathname.startsWith("/e-commerce") &&
        !token
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // ==========================================
    // INVENTORY PROTECTION
    // ==========================================

    if (
        request.nextUrl.pathname.startsWith("/invantory")
    ) {
        // No token
        if (!token) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }

        try {
            // Verify JWT
            const decoded = jwt.verify(
                token,
                "screct-key"
            ) as {
                userId: string;
            };

            const userId = decoded.userId;

            // Find user
            // Only Accept users can access Inventory
            const user = await User.findOne({
                _id: userId,
                userStatus: "Accept",
            });

            // User does not exist
            // or user is not Accept
            if (!user) {
                return NextResponse.redirect(
                    new URL("/e-commerce", request.url)
                );
            }

        } catch (error) {
            console.error(
                "Proxy authentication error:",
                error
            );

            return NextResponse.redirect(
                new URL("/profile", request.url)
            );
        }
    }

    return NextResponse.next();
}

// ==========================================
// MATCHER
// ==========================================

export const config = {
    matcher: [
        "/e-commerce",
        "/invantory/:path*",
    ],
};