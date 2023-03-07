import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
// eslint-disable-next-line no-unused-vars

import Navigation from "../components/nav/Nav";
// import "reset-css";
import { CartContextProvider } from "../utils/useCartContext";
import { UserContextProvider } from "../utils/useUserContext";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Shopping App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <CartContextProvider>
          <UserContextProvider>
            <Navigation />
            <Component {...pageProps} />
          </UserContextProvider>
        </CartContextProvider>
      </MantineProvider>
    </>
  );
};
export default App;
