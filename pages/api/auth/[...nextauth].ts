import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../utils/prisma";

export const authOptions: AuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
  adapter: PrismaAdapter(prisma),

  debug: process.env.NODE_ENV !== "production",
};

export default NextAuth(authOptions);
