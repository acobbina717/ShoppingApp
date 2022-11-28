import { useContext } from "react";
import CheckoutItem from "../../Components/Checkout-Item/CheckoutItem";
import { CartContext } from "../../Contexts/cart.context";
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutHeaderBlock,
  CheckoutTotal,
} from "./checkout.styles";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer className="checkout-container">
      <CheckoutHeader className="checkout-header">
        <CheckoutHeaderBlock className="header-block">
          <span>Product</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock className="header-block">
          <span>Description</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock className="header-block">
          <span>Quantity</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock className="header-block">
          <span>Price</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock className="header-block">
          <span>Remove</span>
        </CheckoutHeaderBlock>
      </CheckoutHeader>
      {cartItems.map((product) => {
        return <CheckoutItem key={product.id} cartItem={product} />;
      })}
      <CheckoutTotal className="total">Total: ${cartTotal}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export default Checkout;
