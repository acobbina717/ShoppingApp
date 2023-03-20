import { Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAuth = () => {
    try {
      signOut({ redirect: false });
      router.push(`/`);

      if (!session) {
        signIn();
      }
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Button variant="subtle" color="dark" onClick={handleAuth}>
      {session ? "Sign Out" : "Sign In"}
    </Button>
  );
};

export default AuthButton;
