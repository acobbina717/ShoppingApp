import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const handleToggleDropdown = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer
      className="cart-icon-container"
      onClick={handleToggleDropdown}
    >
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
