import { NextRequest, NextResponse } from "next/server";

export default function Proxy(request:NextRequest) {
    const token = request.cookies.get('token')?.value
    if (request.nextUrl.pathname.startsWith('/e-commerce') && !token) {
 
    return NextResponse.redirect(new URL('/login', request.url))
  }
}