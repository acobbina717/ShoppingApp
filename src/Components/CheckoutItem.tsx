import { Flex, Image, Text } from "@mantine/core";

import {
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import { useAppDispatch } from "../Utils/Redux/hooks/hooks";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeItemFromCart,
} from "../Utils/Redux/features/cart/cartSlice";

import type { Product } from "../Utils/Redux/features/categories/categoriesSlice";
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

  return (
    <tr>
      <td style={{ width: "23%" }}>
        <Image src={imageUrl} alt={name} />
      </td>
      <td style={{ width: "23%" }}>
        <Text size={"lg"}>{name}</Text>
      </td>
      <td style={{ width: "18%" }}>
        <QuantityCounter
          quantity={Number(quantity)}
          addToCart={addToCart}
          subtractFromCart={subtractFromCart}
        />
      </td>
      <td style={{ width: "23%" }}>{`$${price}`}</td>
      <td style={{ paddingLeft: 25 }}>
        <IconTrash cursor={"pointer"} onClick={removeFromCart} />
      </td>
    </tr>
  );
};

export default CheckoutItem;
