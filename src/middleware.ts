import { auth } from "./auth"
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/i/flow/login');
  }
}

// The middleware above will only work for routers that are matched below "Matched Paths".
export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
}