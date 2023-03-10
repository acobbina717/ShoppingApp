import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token = jwt.verify(req.cookies.SHOPPING_COOKIE, process.env.TOKENKEY);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(process.env.COOKIE as string, token, {
      expires: new Date(0),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.status(201);
  res.json({});
};
