import { Center, Image, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { useAppDispatch } from "../src/Utils/Redux/hooks/hooks";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeItemFromCart,
} from "../src/Utils/Redux/features/cart/cartSlice";

import type { Product } from "../src/Utils/Redux/features/categories/categoriesSlice";
import QuantityCounter from "./QuantityCounter";

type Props = {
  cartItem: Product;
};

const CheckoutItem = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();
  const { imageUrl, name, price, quantity } = cartItem;
  const addToCart = () => dispatch(increaseCartItemQuantity(cartItem));
  const subtractFromCart = () => dispatch(decreaseCartItemQuantity(cartItem));
  const removeFromCart = () => dispatch(removeItemFromCart(cartItem));

  // const useStyles = createStyles({});
  // const { theme } = useStyles();

  return (
    <tr>
      <td style={{ width: "25%" }}>
        <Image src={imageUrl} alt={name} height="100%" />
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
          addToCart={addToCart}
          subtractFromCart={subtractFromCart}
        />
      </td>

      <td>
        <Center>
          <IconTrash
            cursor="pointer"
            onClick={removeFromCart}
            // color={hovered ? theme.colors.red[5] : theme.colors.gray[4]}
          />
        </Center>
      </td>
    </tr>
  );
};

export default CheckoutItem;
