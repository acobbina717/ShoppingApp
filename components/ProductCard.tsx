import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Overlay,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import { useHover } from "@mantine/hooks";

import { useCart } from "../utils/hooks";

import type { Product } from "../utils/typeDef";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { image, name, price } = product;
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
          <Image src={image} alt={name} />
        </Card.Section>
      </Card>

      <Paper pt={5} component={Link} href="/shop">
        <Tooltip label={name} withArrow position="bottom">
          <Grid>
            <Grid.Col span={12} p={5}>
              <Group position="apart">
                <Text
                  size="md"
                  weight="bold"
                  w="60%"
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
                <Text pr="3%" weight="bold">
                  ${price}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default ProductCard;
