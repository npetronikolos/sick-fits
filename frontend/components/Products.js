import { useQuery, gql, NetworkStatus } from "@apollo/client";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";
import { perPage } from "../config";

import Product from "./Product";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $take: Int) {
    products(take: $take, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading, fetchMore, networkStatus } = useQuery(
    ALL_PRODUCTS_QUERY,
    {
      variables: {
        skip: page * perPage - perPage,
        take: perPage,
      },

      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );
  console.log(data, error, loading, fetchMore, networkStatus);
  // console.log({ page });

  // from nextjs examples
  // const loadingMoreProducts = networkStatus === NetworkStatus.fetchMore;

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: allPosts.length,
  //     },
  //   })
  // }

  if (error) return <DisplayError error={error} />;
  // if (loading && !loadingMorePosts) return <div>Loading</div>;
  if (loading) return <div>Loading</div>;

  // const { allPosts, _allPostsMeta } = data
  // const areMorePosts = allPosts.length < _allPostsMeta.count

  return (
    <div>
      <ProductsListStyles>
        {data.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
