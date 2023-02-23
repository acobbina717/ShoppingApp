import {
  Button,
  Center,
  Container,
  Divider,
  Modal,
  Table,
  Text,
} from "@mantine/core";
import CheckoutItem from "./CheckoutItem";
import PaymentForm from "./Payment-Form/PaymentForm";
import { useAppSelector } from "../Utils/Redux/hooks/hooks";
import { useState } from "react";

const Checkout = () => {
  const [opened, setOpened] = useState(false);

  const { cartItems, cartTotal } = useAppSelector((state) => state.cart);
  const tableData = cartItems.map((product) => {
    return <CheckoutItem key={product.id} cartItem={product} />;
  });

  return (
    <Container fluid mih={"90vh"}>
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th>
              <Center>Product</Center>
            </th>
            <th>
              <Center>Description</Center>
            </th>
            <th>
              <Center>Price</Center>
            </th>
            <th>
              <Center>Quantity</Center>
            </th>
            <th>
              <Center>Remove</Center>
            </th>
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
