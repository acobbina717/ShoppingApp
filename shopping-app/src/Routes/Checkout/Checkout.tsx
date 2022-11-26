import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";
import "./checkout.styles.scss";

type Props = {};

const Checkout = (props: Props) => {
  const {
    cartItems,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeCartItem,
  } = useContext(CartContext);

  return (
    <div>
      {cartItems.map(({ id, imageUrl, name, price, quantity }) => (
        <div key={id}>
          <span>{name}</span>
          <span onClick={() => decreaseCartQuantity(id)}>{"<"}</span>
          <span>{quantity}</span>
          <span onClick={() => increaseCartQuantity(id)}>{">"}</span>
          <span>{price}</span>
          <span onClick={() => removeCartItem(id)}>{"X"}</span>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
