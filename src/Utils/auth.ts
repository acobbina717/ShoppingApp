import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.SHOPPING_COOKIE;
    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, process.env.TOKENKEY);
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("User not authorized");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not authorized" });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not authorized" });
  };
};
