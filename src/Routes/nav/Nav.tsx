import {
  Header,
  Container,
  Group,
  Avatar,
  Burger,
  Stack,
  Popover,
} from "@mantine/core";
import NavLinks from "../../components/nav-links/NavLinks";
import Cart from "../../components/cart/Cart";

import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./nav.styles";

const Nav = () => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={60} mb={30} className={classes.root}>
      <Container className={classes.header}>
        <Avatar size={28} />

        <Group spacing={5} className={classes.links}>
          <NavLinks />
          <Cart />
        </Group>

        <div className={classes.burger}>
          <Popover position="bottom" withArrow shadow="md" onChange={toggle}>
            <Group>
              <Popover.Target>
                <Burger opened={opened} size="sm" />
              </Popover.Target>
              <Cart />
            </Group>

            <Popover.Dropdown>
              <Stack>
                <NavLinks />
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </div>
      </Container>
    </Header>
  );
};

export default Nav;
