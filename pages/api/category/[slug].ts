import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { slug } = query;

  const category = await prisma.category.findUnique({
    where: { name: slug as string },
    include: { products: true },
  });

  res.json(category);
};
