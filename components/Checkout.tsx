import {
  Button,
  Center,
  Container,
  Divider,
  Group,
  Modal,
  Table,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useStore } from "zustand";
import { useCart } from "../src/utils/hooks/useCart";
import CheckoutItem from "./CheckoutItem";
import PaymentForm from "./Payment-Form/PaymentForm";

const Checkout = () => {
  const [opened, setOpened] = useState(false);
  const { getCartTotal, cartItems } = useStore(useCart);
  const cartTotal = getCartTotal();

  const tableData = cartItems.map((product) => {
    return <CheckoutItem key={product.id} cartItem={product} />;
  });

  return (
    <Container fluid mih="90vh">
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

      <Group position="right" mt={15}>
        <Title order={3}>Total: ${cartTotal}</Title>
      </Group>
      <Container size="xs" p={50}>
        <Center>
          <Button
            fullWidth
            h={50}
            radius="xl"
            variant="outline"
            color="gray"
            onClick={() => setOpened(true)}
          >
            Checkout
          </Button>
          <Modal centered opened={opened} onClose={() => setOpened(false)}>
            <PaymentForm />
          </Modal>
        </Center>
      </Container>
    </Container>
  );
};

export default Checkout;
