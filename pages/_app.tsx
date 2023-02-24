import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Navigation from "../components/nav/Nav";
import { Provider } from "react-redux";
import { persistor, store } from "../src/Utils/Redux/app/store/store";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}
