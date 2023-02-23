import { Card, Group, Image, Stack, Text, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCircleMinus } from "@tabler/icons-react";
import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import QuantityCounter from "../QuantityCounter";
import { useStyles } from "./cart-item.styles";

type CartItemProps = {
  cartItem: Product;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { theme } = useStyles();
  const { name, quantity, imageUrl, price } = cartItem;
  const { hovered, ref } = useHover();
  return (
    <Card
      h={150}
      withBorder
      display={"flex"}
      mb={15}
      p={0}
      style={{
        alignItems: "center",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
    >
      <Group noWrap spacing={0}>
        <Image src={imageUrl} alt={`${name}`} width={136} mr={4} />
        <Stack>
          <Group position="apart">
            <Text size={"sm"} w={210} ml={3}>
              {name}
            </Text>
            <Text>{`$${price}`}</Text>
          </Group>
          <Group position="right" ml={20}>
            <div ref={ref}>
              <Tooltip label="Remove from cart">
                <IconCircleMinus
                  size={20}
                  color={hovered ? theme.colors.red[5] : theme.colors.dark[2]}
                  cursor={"pointer"}
                />
              </Tooltip>
            </div>
            <QuantityCounter quantity={quantity as number} width={40} />
          </Group>
          <Text align="right">{`Total: $${Number(quantity) * price} `}</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default CartItem;
