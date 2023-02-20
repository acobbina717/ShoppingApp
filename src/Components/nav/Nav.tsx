import {
  Header,
  Container,
  Group,
  Avatar,
  Burger,
  Stack,
  Popover,
  Button,
  Flex,
} from "@mantine/core";
import Cart from "../cart/Cart";
import Link from "next/link";
import AuthButton from "../auth-button/AuthButton";

import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./nav.styles";

const NavLinks = () => (
  <>
    <Button
      component={Link}
      variant="subtle"
      color="dark"
      href={"/shop"}
      size="md"
    >
      Shop
    </Button>
    <AuthButton otherProps={{ size: "md" }} />
  </>
);

const Nav = () => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={90} mb={30} style={{ position: "sticky" }}>
      <Container ml={15} mr={15} fluid>
        <Flex justify={"space-between"} align="center" h={"90px"}>
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
        </Flex>
      </Container>
    </Header>
  );
};

export default Nav;
