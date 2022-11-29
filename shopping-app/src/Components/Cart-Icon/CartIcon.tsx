import { setIsCartOpen } from "../../Utils/Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, cartCount } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleToggleDropdown = () => dispatch(setIsCartOpen(!isCartOpen));

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
