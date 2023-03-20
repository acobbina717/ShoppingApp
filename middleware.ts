// import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line no-restricted-exports
// export { default } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./pages/api/auth/[...nextauth]";
// eslint-disable-next-line no-restricted-exports
export { default } from "next-auth/middleware";
export const config = { matcher: ["/checkout"] };

// const authenticatedPages = ["/checkout"];

// export default function middleware(req: NextRequest) {
//   if (authenticatedPages.find((p) => p === req.nextUrl.pathname)) {
//     const env = process.env.NODE_ENV;
//     let token;

//     if (env === "production") {
//       token = req.cookies.get("__Secure-next-auth.session-token");
//     }
//     token = req.cookies.get("next-auth.session-token");

//     const url = req.nextUrl.clone();
//     url.pathname = "/auth";

//     if (!token) {
//       return NextResponse.redirect(url);
//     }
//   }
// }
