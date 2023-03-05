import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const categories = await prisma.category.findMany({
    include: { products: true },
  });

  res.json(categories);
};
