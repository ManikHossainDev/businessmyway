import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  USER_PRIVATE_ROUTES,
  isPathMatch,
} from "@/constants/routes";
import { isAdminRole } from "@/utils/role";

const getUserRole = (request: NextRequest) => {
  const rawUser = request.cookies.get("user")?.value;
  if (!rawUser) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(rawUser));
    return typeof parsed?.role === "string" ? parsed.role : null;
  } catch {
    try {
      const parsed = JSON.parse(rawUser);
      return typeof parsed?.role === "string" ? parsed.role : null;
    } catch {
      return null;
    }
  }
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = getUserRole(request);
  const isAdmin = isAdminRole(role);

  const isAdminRoute = isPathMatch(pathname, ADMIN_ROUTES);
  const isUserRoute = isPathMatch(pathname, USER_PRIVATE_ROUTES);
  const isAuthRoute = isPathMatch(pathname, AUTH_ROUTES);

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isUserRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isAuthRoute && token) {
    const destination = isAdmin ? "/admin-dashboard" : "/";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
