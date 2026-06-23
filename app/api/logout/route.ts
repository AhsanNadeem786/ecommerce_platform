import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST() {
    const cokkieStore = await cookies()
    cokkieStore.delete("token")
    return NextResponse.json({ message: "logout successfully" }, { status: 200 });
    
}
