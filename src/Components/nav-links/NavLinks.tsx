import { Button } from "@mantine/core";
import Link from "next/link";
import AuthButton from "../auth-button/AuthButton";

const NavLinks = () => (
  <>
    <Button component={Link} variant="subtle" color="dark" href={"/"}>
      Shop
    </Button>
    <AuthButton />
  </>
);

export default NavLinks;
