import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
// eslint-disable-next-line no-unused-vars
import { persister, store } from "../src/Utils/Redux/app/store/store";
import Navigation from "../components/nav/Nav";
import "../styles/global.css";

const App = (props: AppProps) => {
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
};
export default App;
