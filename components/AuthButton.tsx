import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { RootState } from "../src/utils/redux/app/store/store";
import { signOutLoading } from "../src/utils/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../src/utils/redux/hooks/hooks";

type AuthButtonProps = {
  // eslint-disable-next-line react/require-default-props
  otherProps?: ButtonProps;
};

const AuthButton = ({ otherProps }: AuthButtonProps) => {
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
};

export default AuthButton;
