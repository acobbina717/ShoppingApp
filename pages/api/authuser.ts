import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../src/utils/auth";

export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user) => {
    res.json(user);
  }
);
