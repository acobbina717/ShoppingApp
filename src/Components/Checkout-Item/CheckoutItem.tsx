import {
  addToCart,
  removeFromCart,
  clearFromCart,
} from "../../Utils/Redux/features/cart/cartSlice";
import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import { useAppDispatch } from "../../Utils/Redux/hooks/hooks";

import {
  Arrow,
  Value,
  BaseSpan,
  Quantity,
  RemoveButton,
  ImageContainer,
  CheckoutItemContainer,
} from "./checkout-item.styles";

type Props = {
  cartItem: Product;
};

const CheckoutItem = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();

  const { imageUrl, name, price, quantity } = cartItem;

  const removeItemHandler = () => dispatch(removeFromCart(cartItem));

  const addItemHandler = () => dispatch(addToCart(cartItem));

  const clearItemHandler = () => dispatch(clearFromCart(cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>

      <BaseSpan> {name} </BaseSpan>

      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>

      <BaseSpan> {price}</BaseSpan>

      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
