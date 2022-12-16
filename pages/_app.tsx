import "../styles/index.scss";
import type { AppProps } from "next/app";
import Layout from "../lib/components/Layout";
import { SessionProvider } from "next-auth/react";
import { storeWrapper } from "../lib/store";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default storeWrapper.withRedux(App);
