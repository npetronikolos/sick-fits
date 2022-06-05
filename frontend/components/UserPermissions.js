import { gql, useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        role {
          canManageCart
          canManageUsers
          canManageRoles
          canManageOrders
          canSeeOtherUsers
          canManageProducts
        }
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
