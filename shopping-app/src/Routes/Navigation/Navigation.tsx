import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownSvg } from "../../assets/crown.svg";
import { UserContext } from "../../Contexts/user.context";
import { signOutUser } from "../../Utils/Firebase/firebase.utils";

import CartDropdown from "../../Components/Cart-Dropdown/CartDropdown";
import CartIcon from "../../Components/Cart-Icon/CartIcon";

import { CartContext } from "../../Contexts/cart.context";

import "./navigation.styles.scss";

type NavigationProps = {};

const Navigation = (props: NavigationProps) => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownSvg className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>

        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
