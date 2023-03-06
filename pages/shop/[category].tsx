import { Container } from "@mantine/core";
import Category from "../../components/Category";
import prisma from "../../utils/prisma";

const Page = ({ products }) => {
  return (
    <Container fluid>
      <Category products={products} />
    </Container>
  );
};

export const getServerSideProps = async ({ query }) => {
  const slug = query.category;
  const category = await prisma.category.findUnique({
    where: { name: slug },
    include: { products: true },
  });
  return { props: category };
};

export default Page;
