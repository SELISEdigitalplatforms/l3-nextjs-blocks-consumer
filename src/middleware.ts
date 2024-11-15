import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = await cookies().get("x-blocks-access-token");

  if (!isPublicRoute && !cookie) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
