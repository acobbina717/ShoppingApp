import { setIsCartOpen } from "../../Utils/Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";
import { useStyles } from "./cart.styles";

import { BsBag } from "react-icons/bs";
import { Button, Popover } from "@mantine/core";

import CartItem from "../Cart-Item/CartItem";

const Cart = () => {
  const { classes } = useStyles();
  const { isCartOpen, cartCount, cartItems } = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  const handleToggleDropdown = () => dispatch(setIsCartOpen(!isCartOpen));

  const goToCheckoutHandler = () => {
    // navigate("/checkout");
  };

  return (
    <Popover position={"bottom"}>
      <Popover.Target>
        <div className={classes.container}>
          <BsBag size={24} />

          <span className={classes.itemCount}>{cartCount}</span>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div className={classes.cartItems}>
          {cartItems.length ? (
            cartItems.map((product) => (
              <CartItem key={product.id} cartItem={product} />
            ))
          ) : (
            <span className={classes.emptyMessage}>Your cart is empty</span>
          )}
        </div>

        <Button variant="outline" color="cyan" onClick={goToCheckoutHandler}>
          GO TO CHECKOUT
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Cart;
