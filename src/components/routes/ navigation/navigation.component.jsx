import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";

import './navigation.styles.scss';


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const signOut = async () => {
    await signOutUser(currentUser);
  }

  console.log(currentUser);
  return (
    <Fragment>
      <div className="navigation">
          <Link className="logo-container" to='/'>
              <CrownLogo className='logo' />
          </Link>
          <div className="nav-links-container">
              <Link className="nav-link" to='/shop'>SHOP</Link>
              { currentUser ? (
                <span onClick={signOut} className="nav-link">SIGN OUT</span>
              ) : (
                <Link className="nav-link" to='/auth'>SIGN IN</Link>
              ) }
              <CartIcon />
          </div>
          { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
    )
  }

  export default Navigation;