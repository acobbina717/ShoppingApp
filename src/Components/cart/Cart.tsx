import { BsBag } from "react-icons/bs";
import CartItem from "../Cart-Item/CartItem";
import { Button, Popover } from "@mantine/core";

import { useStyles } from "./cart.styles";

import { useAppSelector } from "../../Utils/Redux/hooks/hooks";

const Cart = () => {
  const { classes } = useStyles();
  const { cartCount, cartItems } = useAppSelector((state) => state.cart);

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
