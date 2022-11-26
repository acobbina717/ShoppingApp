import "./cart-dropdown.styles.scss";
import Button from "../Button/Button";
import CartItem from "../Cart-Item/CartItem";
import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";
import { useNavigate } from "react-router-dom";

type Props = {};

const CartDropdown = (props: Props) => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((product) => (
          <CartItem key={product.id} cartItem={product} />
        ))}
      </div>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
