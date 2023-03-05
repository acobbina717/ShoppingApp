import { Card, Group, Image, Stack, Text } from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import QuantityCounter from "../../QuantityCounter";

import { useStyles } from "./cart-item.styles";

import type { Product } from "../../../utils/typeDef";
import { useCart } from "../../../utils/hooks";

type CartItemProps = {
  cartItem: Product;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const { addToCart, subtractFromCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart(cartItem);
  };
  const handleSubtractFromCart = () => {
    subtractFromCart(cartItem);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(cartItem);
  };
  const { theme } = useStyles();

  return (
    <Card
      withBorder
      display="flex"
      mb={15}
      p={0}
      style={{
        alignItems: "center",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
    >
      <Card.Section>
        <Image src={imageUrl} alt={`${name}`} width={136} mr={4} />
      </Card.Section>

      <Stack pl={10} w="100%">
        <Text>{name}</Text>
        <Text>{`$${Number(quantity) * price} `}</Text>
        <Group position="right" mr={15}>
          <IconTrash
            cursor="pointer"
            size={20}
            onClick={handleRemoveFromCart}
          />

          <QuantityCounter
            quantity={Number(quantity)}
            addToCart={handleAddToCart}
            subtractFromCart={handleSubtractFromCart}
          />
        </Group>
      </Stack>
    </Card>
  );
};

export default CartItem;
