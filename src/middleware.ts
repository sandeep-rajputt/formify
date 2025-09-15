import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // when usercome to /dashboard then redirect to /dashboard/..
  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL("/dashboard/my-dashboard", request.url)
    );
  }

  const response = NextResponse.next();

  // Add the pathname to headers so server components can access it
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
