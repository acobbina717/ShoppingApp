import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

import Navigation from "../components/nav/Nav";
import { CartContextProvider } from "../utils/useCartContext";
import { UserContextProvider } from "../utils/useUserContext";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <title>Shopping App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider session={session}>
        <UserContextProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "dark",
            }}
          >
            <CartContextProvider>
              <Navigation />
              <Component {...pageProps} />
            </CartContextProvider>
          </MantineProvider>
        </UserContextProvider>
      </SessionProvider>
    </>
  );
};
export default App;
