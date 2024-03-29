// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        email,
        time: Date.now(),
      },
      process.env.TOKENKEY as string,
      {
        expiresIn: "6h",
      }
    );
    res.setHeader(
      "Set-Cookie",

      cookie.serialize(process.env.COOKIE as string, token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Wrong email or password" });
  }
};
