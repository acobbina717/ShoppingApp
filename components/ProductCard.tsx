import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  Image,
  Overlay,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import { useHover } from "@mantine/hooks";

import { useCart } from "../src/utils/hooks";

import type { Product } from "../src/utils/typeDef";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(product);
  };

  const { hovered, ref } = useHover();

  return (
    <Box>
      <Card p={0} ref={ref}>
        {hovered && (
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)"
            component={Container}
          >
            <Center>
              <Button
                variant="outline"
                style={{ position: "absolute", bottom: "10%", width: "80%" }}
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            </Center>
          </Overlay>
        )}

        <Card.Section href="/shop" component={Link}>
          <Image src={imageUrl} alt={name} />
        </Card.Section>
        <Center>
          <Button
            display="none"
            variant="outline"
            style={{ position: "absolute", bottom: "10%", width: "80%" }}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </Center>
      </Card>
      <Paper pt={5} component={Link} href="/shop">
        <Tooltip label={name} withArrow position="bottom">
          <Group display="flex" position="apart">
            <Text
              size="md"
              weight="bold"
              w="61%"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {name}
            </Text>
            <Text pr={10} weight="bold">
              ${price}
            </Text>
          </Group>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default ProductCard;
