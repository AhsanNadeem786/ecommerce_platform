import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "./models/User";

export default async function Proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (request.nextUrl.pathname.startsWith('/e-commerce') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname.startsWith("/invantory")) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const decoded = jwt.verify(token, 'screct-key') as { userId: string };
            const userId = decoded.userId;

            const user = await User.findOne({ _id: userId, userStatus: 'active' });

            if (!user) {
                return NextResponse.redirect(new URL('/e-commerce', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/e-commerce',
        '/invantory/:path*'
    ]
};
