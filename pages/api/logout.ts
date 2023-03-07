import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token = "";
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
