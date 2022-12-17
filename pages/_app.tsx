import "../styles/index.scss";
import type { AppProps } from "next/app";
import Layout from "../lib/components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import { storeWrapper } from "../lib/store";
import Auth from "../lib/components/auth/Auth";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

export default storeWrapper.withRedux(App);
