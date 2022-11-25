import "./cart-dropdown.styles.scss";
import Button from "../Button/Button";

type Props = {};

const CartDropdown = (props: Props) => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
