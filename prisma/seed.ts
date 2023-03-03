import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NEW_SHOP_DATA } from "./shop-data";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    NEW_SHOP_DATA.map(async ({ title, items }) => {
      return prisma.category.upsert({
        where: { name: title },
        update: {},
        create: {
          name: title,
          products: {
            create: items.map(({ imageUrl, name, price }) => ({
              name,
              price,
              image: imageUrl,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("password", salt),
      name: "Test",
    },
  });
};

run()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
