import Link from "next/link";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";
import SignOut from "./SignOut";
import AdminMenuDefault from "./AdminDropdownMenuComponent";

export default function Nav() {
  const user = useUser();
  // console.log(user.role.canManageProducts);
  // const userpermManageProducts = useUserPermcanManageProducts();
  // console.log(userpermManageProducts);
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Link href="/createproduct">Create Product</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
