import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import QuantityCounter from "../QuantityCounter";

import { useAppDispatch } from "../../src/Utils/Redux/hooks/hooks";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "../../src/Utils/Redux/features/cart/cartSlice";

import { useStyles } from "./cart-item.styles";

import type { Product } from "../../src/Utils/Redux/features/categories/categoriesSlice";

type CartItemProps = {
  cartItem: Product;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const dispatch = useAppDispatch();
  const addToCart = () => dispatch(increaseItemQuantity(cartItem));
  const subtractFromCart = () => dispatch(decreaseItemQuantity(cartItem));
  const removeFromCart = () => dispatch(removeItemFromCart(cartItem));

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
          <IconTrash cursor="pointer" size={20} onClick={removeFromCart} />

          <QuantityCounter
            quantity={Number(quantity)}
            addToCart={addToCart}
            subtractFromCart={subtractFromCart}
          />
        </Group>
      </Stack>
    </Card>
  );
};

export default CartItem;
