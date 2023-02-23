import { Button, Container, Divider, Modal, Table, Text } from "@mantine/core";
import CheckoutItem from "./CheckoutItem";
import PaymentForm from "./Payment-Form/PaymentForm";
import { useAppSelector } from "../Utils/Redux/hooks/hooks";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, cartTotal } = useAppSelector((state) => state.cart);

  const tableData = cartItems.map((product) => {
    return <CheckoutItem key={product.id} cartItem={product} />;
  });

  const [opened, setOpened] = useState(false);

  return (
    <Container fluid mih={"90vh"}>
      <Table horizontalSpacing={"sm"} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
      <Divider />
      <Text>Total: ${cartTotal}</Text>
      <Button onClick={() => setOpened(true)}>Checkout</Button>
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <PaymentForm />
      </Modal>
    </Container>
  );
};

export default Checkout;
