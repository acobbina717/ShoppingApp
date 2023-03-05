import { Container, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import Category from "../../components/Category";
import { useCategory, useGridColSkeleton } from "../../utils/hooks";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { products, isError, isLoading } = useCategory(`/${String(slug)}`);
  const nodata = isLoading || isError || products.length < 1;
  const skeletonCol = useGridColSkeleton({ height: 320 });
  return (
    <Container fluid>
      <Grid>{nodata && skeletonCol}</Grid>
      <Category products={products} />
    </Container>
  );
};

export default Page;
