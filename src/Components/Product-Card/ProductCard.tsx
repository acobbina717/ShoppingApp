import {
  ProductCardContainer,
  ProductCardFooter,
  ProductName,
  ProductPrice,
} from "./product-card.styles";
import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import { useAppDispatch } from "../../Utils/Redux/hooks/hooks";
import { addToCart } from "../../Utils/Redux/features/cart/cartSlice";
import { Card } from "@mantine/core";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  const dispatch = useAppDispatch();

  const addProductToCart = () => dispatch(addToCart(product));

  return (
    <Card
      h={380}
      radius="md"
      shadow="lg"
      p="lg"
      styles={{ position: "relative" }}
    >
      <Card.Section>
        <Image src={imageUrl} alt={name} fill style={{ objectFit: "cover" }} />
      </Card.Section>

      {/* <Overlay
        zIndex={0}
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)"
      /> */}
    </Card>

    // <ProductCardContainer>
    //   <img src={imageUrl} alt={`${name}`} />
    //   <ProductCardFooter>
    //     <ProductName>{name}</ProductName>
    //     <ProductPrice>{price}</ProductPrice>
    //   </ProductCardFooter>

    //   <Button
    //     buttonType={BUTTON_TYPE_CLASSES.inverted}
    //     onClick={addProductToCart}
    //   >
    //     Add to cart
    //   </Button>
    // </ProductCardContainer>
  );
};

export default ProductCard;
