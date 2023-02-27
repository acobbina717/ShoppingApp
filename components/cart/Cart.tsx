import {
  Box,
  Button,
  Center,
  Container,
  Drawer,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import { BsBag } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { useCart } from "../../src/utils/hooks";
import CartItem from "../Cart-Item/CartItem";

import { useStyles } from "./cart.styles";

const Cart = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const { cartItems, cartTotal, cartCount, setCartCount, setCartTotal } =
    useStore(useCart);

  const [opened, setOpened] = useState(false);

  const navigateToCheckout = () => {
    router.push("/checkout");
    setOpened(false);
  };

  useEffect(() => {
    setCartCount();
    setCartTotal();
  }, [cartItems, setCartCount, setCartTotal]);

  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        zIndex={99999}
      >
        <Container fluid h="80vh" p={10}>
          {cartItems.length > 0 ? (
            <>
              <ScrollArea.Autosize maxHeight="70vh">
                {cartItems.map((product) => (
                  <CartItem key={product.id} cartItem={product} />
                ))}
              </ScrollArea.Autosize>
              <Group mt={10} position="right">
                <Text>Cart Total: ${cartTotal}</Text>
              </Group>
              <Container mt={40}>
                <Center>
                  <Button
                    variant="outline"
                    color="gray"
                    w={400}
                    onClick={navigateToCheckout}
                  >
                    GO TO CHECKOUT
                  </Button>
                </Center>
              </Container>
            </>
          ) : (
            <span className={classes.emptyMessage}>Your cart is empty</span>
          )}
        </Container>
      </Drawer>

      <Box className={classes.container} onClick={() => setOpened(true)}>
        <BsBag size={24} />
        <span className={classes.itemCount}>{cartCount}</span>
      </Box>
    </>
  );
};

export default Cart;
