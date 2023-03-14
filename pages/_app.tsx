import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider as AuthProvider } from "next-auth/react";

import { Elements } from "@stripe/react-stripe-js";
import Navigation from "../components/nav/Nav";
import { CartContextProvider } from "../utils/useCartContext";
import { UserContextProvider } from "../utils/useUserContext";
import { stripePromise } from "../utils/stripe/stripe.utils";

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

      <AuthProvider session={session}>
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
              <Elements stripe={stripePromise}>
                <Component {...pageProps} />
              </Elements>
            </CartContextProvider>
          </MantineProvider>
        </UserContextProvider>
      </AuthProvider>
    </>
  );
};
export default App;
