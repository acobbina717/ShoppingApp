import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../Contexts/cart.context";

import "./cart-icon.styles.scss";

type Props = {};

const CartIcon = (props: Props) => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const handleToggleDropdown = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={handleToggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
