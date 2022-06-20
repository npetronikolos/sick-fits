import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { concatPagination } from "@apollo/client/utilities";
import { RetryLink } from "@apollo/client/link/retry";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { endpoint, prodEndpoint } from "../config";
import paginationField from "./paginationField";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

// const httpLink = new HttpLink({
//   uri: `http://localhost:4000/api/graphql`, //process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
//   fetchOptions: {
//     credentials: "include", //credentials: "same-origin",
//   },
// });

const httpLink = new createUploadLink({
  // uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  uri: `http://localhost:4000/api/graphql`,
  fetchOptions: {
    credentials: "include",
    // fetch: enhancedFetch,
    // credentials: "same-origin",
  },
});

const retryLink = new RetryLink({
  delay: {
    initial: 2000,
    max: 2000,
    jitter: false,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    //link: from([errorLink, retryLink, httpLink]),
    link: from([errorLink, authLink.concat(httpLink)]),

    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // allProducts: concatPagination(),
            allProducts: paginationField(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
