import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownSvg } from "../../assets/crown.svg";
import { signOutUser } from "../../Utils/Firebase/firebase.utils";

import CartDropdown from "../../Components/Cart-Dropdown/CartDropdown";
import CartIcon from "../../Components/Cart-Icon/CartIcon";

import {
  NavigationContainer,
  LogoContainer,
  NavLinkContainer,
  NavLink,
} from "./navigation.styles";
import { RootState } from "../../Utils/Redux/app/store/store";
import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";

import { signOutLoading } from "../../Utils/Redux/features/user/userSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { isCartOpen } = useAppSelector((state: RootState) => state.cart);

  const handleSignOut = () => {
    dispatch(signOutLoading());
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownSvg className="logo" />
        </LogoContainer>
        <NavLinkContainer className="nav-links-container">
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as={"span"} onClick={handleSignOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinkContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
