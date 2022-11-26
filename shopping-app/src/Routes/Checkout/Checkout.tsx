import { useContext } from "react";
import CheckoutItem from "../../Components/Checkout-Item/CheckoutItem";
import { CartContext } from "../../Contexts/cart.context";
import "./checkout.styles.scss";

type Props = {};

const Checkout = (props: Props) => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((product) => {
        return <CheckoutItem key={product.id} cartItem={product} />;
      })}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
