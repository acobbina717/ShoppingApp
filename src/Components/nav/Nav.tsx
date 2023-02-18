import {
  Header,
  Container,
  Group,
  Avatar,
  Burger,
  Stack,
  Popover,
  Button,
} from "@mantine/core";
import Cart from "../cart/Cart";
import Link from "next/link";
import AuthButton from "../auth-button/AuthButton";

import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./nav.styles";

const NavLinks = () => (
  <>
    <Button component={Link} variant="subtle" color="dark" href={"/"}>
      Shop
    </Button>
    <AuthButton />
  </>
);

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
