import NextLink from "next/link";
import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteProduct from "./DeleteProduct";
import AddToCart from "./AddToCart";

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <NextLink href={`/product/${product.id}`}>{product.name}</NextLink>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <NextLink
          href={{
            pathname: "/update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </NextLink>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
