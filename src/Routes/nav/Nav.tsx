import {
  Header,
  Container,
  Group,
  Avatar,
  Button,
  Burger,
  Transition,
  Paper,
  Stack,
} from "@mantine/core";
import AuthButton from "../../components/auth-button/AuthButton";
import Link from "next/link";
import Cart from "../../components/cart/Cart";
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
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={60} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <Avatar size={28} />

        <Group spacing={5} className={classes.links}>
          <NavLinks />
          <Cart />
        </Group>

        <Group className={classes.burger}>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Cart />
        </Group>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <Stack>
                <NavLinks />
              </Stack>
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default Nav;
