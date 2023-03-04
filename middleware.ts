import { NextRequest, NextResponse } from "next/server";

const authenticatedPages = ["/checkout"];

export default function middleware(req: NextRequest) {
  if (authenticatedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get(process.env.COOKIE as string);

    const url = req.nextUrl.clone();
    url.pathname = "/auth";

    if (!token) {
      return NextResponse.redirect(url);
    }
  }
}
