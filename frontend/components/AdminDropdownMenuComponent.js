import React from "react";
import Link from "next/link";

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import { useUserPermcanManageProducts } from "./User";

const AdminMenuDefault = () => {
  // const userpermManageProducts = useUserPermcanManageProducts();
  // console.log(userpermManageProducts);
  return (
    <DropdownMenu trigger="User Menu">
      <DropdownItemGroup>
        {userpermManageProducts && (
          <DropdownItem>
            <Link href="/createproduct">Create Product</Link>
          </DropdownItem>
        )}
        <DropdownItem>
          <Link href="/account">Account</Link>
        </DropdownItem>
        <DropdownItem>Move</DropdownItem>
        <DropdownItem>Clone</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
        <DropdownItem>Report</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default AdminMenuDefault;
