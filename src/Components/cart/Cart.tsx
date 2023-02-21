import { BsBag } from "react-icons/bs";
import CartItem from "../Cart-Item/CartItem";
import { Button, Container, Drawer } from "@mantine/core";

import { useStyles } from "./cart.styles";

import { useAppSelector } from "../../Utils/Redux/hooks/hooks";
import { useState } from "react";
import Link from "next/link";

const Cart = () => {
  const { classes } = useStyles();
  const { cartCount, cartItems } = useAppSelector((state) => state.cart);

  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="md"
        zIndex={99999}
      >
        <Container fluid h={"80vh"} style={{ border: "2px solid red" }}>
          <div className={classes.cartItems}>
            {cartItems.length ? (
              cartItems.map((product) => (
                <CartItem key={product.id} cartItem={product} />
              ))
            ) : (
              <span className={classes.emptyMessage}>Your cart is empty</span>
            )}
          </div>
          <Button component={Link} href="/checkout">
            GO TO CHECKOUT
          </Button>
        </Container>
      </Drawer>

      <div className={classes.container} onClick={() => setOpened(true)}>
        <BsBag size={24} />
        <span className={classes.itemCount}>{cartCount}</span>
      </div>
    </>
  );
};

export default Cart;
