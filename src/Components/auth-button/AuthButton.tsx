import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { RootState } from "../../Utils/Redux/app/store/store";
import { signOutLoading } from "../../Utils/Redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";

type AuthButtonProps = {
  otherProps?: ButtonProps;
};

function AuthButton({ otherProps }: AuthButtonProps) {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const handleSignOut = () => {
    dispatch(signOutLoading());
  };

  if (!currentUser) {
    return (
      <Button
        variant="subtle"
        color="dark"
        component={Link}
        href="/auth"
        {...otherProps}
      >
        Sign In
      </Button>
    );
  }
  return (
    <Button
      variant="subtle"
      color="dark"
      onClick={handleSignOut}
      {...otherProps}
    >
      Sign Out
    </Button>
  );
}

export default AuthButton;
