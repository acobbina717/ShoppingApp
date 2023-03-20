import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text", placeholder: "email@test.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const { email, name, password, type } = credentials;
        console.log(type);
        let user;
        user = await prisma.user.findUnique({
          where: { email },
        });

        if (user.password === (await bcrypt.compare(password, user.password))) {
          return user;
        }

        if (type === "signup") {
          const salt = bcrypt.genSaltSync();

          user = await prisma.user.create({
            data: {
              name,
              email,
              password: bcrypt.hashSync(password, salt),
            },
          });
          return user;
        }
      },
    }),
  ],
  pages: { signIn: "/auth", signOut: "/" },
  adapter: PrismaAdapter(prisma),

  debug: process.env.NODE_ENV !== "production",
};

export default NextAuth(authOptions);
