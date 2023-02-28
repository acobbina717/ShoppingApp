import { useRouter } from "next/router";
import Category from "../../components/Category";
import { useCategories } from "../../src/utils/hooks";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { getProducts } = useCategories();
  const products = getProducts(String(slug));

  return <Category products={products} />;
};

export default Page;
