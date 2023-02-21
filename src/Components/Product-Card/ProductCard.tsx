import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import { useAppDispatch } from "../../Utils/Redux/hooks/hooks";
import { addToCart } from "../../Utils/Redux/features/cart/cartSlice";
import { Button, Card, Center, createStyles, Image } from "@mantine/core";
import { useHover } from "@mantine/hooks";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  const dispatch = useAppDispatch();

  const { hovered, ref } = useHover();
  const addProductToCart = () => dispatch(addToCart(product));

  return (
    <Card radius="md" shadow="lg" style={{ position: "relative" }}>
      <Card.Section ref={ref}>
        <Image src={imageUrl} alt={name} radius={"sm"} />
        <Center>
          <Button
            style={{ position: "absolute" }}
            w={"80%"}
            bottom={10}
            display={!hovered && "none"}
            onClick={addProductToCart}
          >
            Add To Cart
          </Button>
        </Center>
      </Card.Section>
    </Card>

    //   <Button
    //     buttonType={BUTTON_TYPE_CLASSES.inverted}
    //   >
  );
};

export default ProductCard;
