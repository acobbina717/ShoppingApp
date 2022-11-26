import "./cart-dropdown.styles.scss";
import Button from "../Button/Button";
import CartItem from "../Cart-Item/CartItem";
import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";
import { Link } from "react-router-dom";

type Props = {};

const CartDropdown = (props: Props) => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((product) => (
          <CartItem key={product.id} cartItem={product} />
        ))}
      </div>
      <Link to="/checkout">
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
