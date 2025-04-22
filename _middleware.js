// In the context of web development, middleware refers to a piece of code that sits between the incoming
// request and the final response in an application. It acts as a bridge, allowing you to modify or intercept
// the request and response objects, perform additional processing, and control the flow of the application.

// Middleware functions are commonly used in frameworks like Express.js and Next.js to handle tasks such as
// authentication, logging, error handling, and more. They provide a way to modularize and organize the code
// by separating concerns into reusable middleware functions.

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests if:
  // 1. If its a request for the next auth session and provider fetching
  // 2. the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // If the token does not exist, redirect to the login page when accessing any protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("https://spotify-red-delta.vercel.app/login");
  }
}
