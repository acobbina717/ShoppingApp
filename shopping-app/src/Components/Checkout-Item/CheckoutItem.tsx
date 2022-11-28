import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";
import { Products } from "../../Contexts/categories.context";
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
  cartItem: Products;
};

const CheckoutItem = ({ cartItem }: Props) => {
  const { addToCart, removeFromCart, clearFromCart } = useContext(CartContext);
  const { imageUrl, name, price, quantity } = cartItem;

  const removeItemHandler = () => removeFromCart(cartItem);

  const addItemHandler = () => addToCart(cartItem);

  const clearItemHandler = () => clearFromCart(cartItem);

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
