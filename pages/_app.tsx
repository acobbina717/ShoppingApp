import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
// eslint-disable-next-line no-unused-vars

import Navigation from "../components/nav/Nav";
// import "reset-css";
import { CartContextProvider } from "../utils/hooks";

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

      <CartContextProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <Navigation />
          <Component {...pageProps} />
        </MantineProvider>
      </CartContextProvider>
    </>
  );
};
export default App;
