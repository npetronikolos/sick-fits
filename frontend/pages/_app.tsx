import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import NProgress from "nprogress";
import Router from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CartStateProvider } from "../lib/cartState";

import SEO from "../next-seo.config";
import App from "../components/App";
import "../components/styles/nprogress.css";
import { Fonts, theme } from "@/infrastructure/theme";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const customTheme = extendTheme({
  colors: theme.colors,
  fonts: theme.fonts,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={customTheme}>
        <Fonts />
        <CartStateProvider>
          <App>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </App>
        </CartStateProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
