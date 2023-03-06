import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import QuantityCounter from "../../QuantityCounter";
import { useStyles } from "./cart-item.styles";
import { useCart } from "../../../utils/hooks";
import type { Product } from "../../../utils/typeDef";

type CartItemProps = {
  cartItem: Product;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, image, price } = cartItem;
  const { addToCart, subtractFromCart, removeFromCart } = useCart();
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
        <Image src={image} alt={`${name}`} width={136} mr={4} />
      </Card.Section>

      <Stack pl={10} w="100%">
        <Text>{name}</Text>
        <Text>{`$${(quantity as number) * price} `}</Text>

        <Group position="right" mr={15}>
          <IconTrash
            cursor="pointer"
            size={20}
            onClick={() => removeFromCart(cartItem)}
          />

          <QuantityCounter
            quantity={quantity as number}
            addToCart={() => addToCart(cartItem)}
            subtractFromCart={() => subtractFromCart(cartItem)}
          />
        </Group>
      </Stack>
    </Card>
  );
};

export default CartItem;
