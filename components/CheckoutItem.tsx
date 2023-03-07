import { Center, Image, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import QuantityCounter from "./QuantityCounter";
import { Product } from "../utils/typeDef";
import { useCart } from "../utils/useCartContext";

type Props = {
  cartItem: Product;
};

const CheckoutItem = ({ cartItem }: Props) => {
  const { image, name, price, quantity } = cartItem;

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

  // const useStyles = createStyles({});
  // const { theme } = useStyles();

  return (
    <tr>
      <td style={{ width: "25%" }}>
        <Image src={image} alt={name} height="100%" />
      </td>

      <td style={{ width: "23%" }}>
        <Text align="center" size="sm">
          {name}
        </Text>
      </td>

      <td style={{ width: "20%" }}>
        <Center>
          <Text size="md">${price * Number(quantity)}</Text>
        </Center>
      </td>

      <td style={{ width: "5%" }}>
        <QuantityCounter
          quantity={Number(quantity)}
          addToCart={handleAddToCart}
          subtractFromCart={handleSubtractFromCart}
        />
      </td>

      <td>
        <Center>
          <IconTrash
            cursor="pointer"
            onClick={handleRemoveFromCart}
            // color={hovered ? theme.colors.red[5] : theme.colors.gray[4]}
          />
        </Center>
      </td>
    </tr>
  );
};

export default CheckoutItem;
