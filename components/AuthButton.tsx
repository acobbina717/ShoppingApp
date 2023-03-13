import { Button } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthButton = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleAuth = () => {
    try {
      router.push(`/auth`);
      if (data) {
        signOut();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="subtle" color="dark" onClick={handleAuth}>
      {data ? "Sign Out" : "Sign In"}
    </Button>
  );
};

export default AuthButton;
