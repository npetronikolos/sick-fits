import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import NProgress from "nprogress";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import { CartStateProvider } from "../lib/cartState";

import SEO from "../next-seo.config";
import App from "../components/App";
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateProvider>
        <App>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </App>
      </CartStateProvider>
    </ApolloProvider>
  );
}
