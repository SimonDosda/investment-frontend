import "../styles/index.scss";
import type { AppProps } from "next/app";
import Layout from "../lib/components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import { storeWrapper } from "../lib/store";
import Auth from "../lib/components/auth/Auth";
import { Provider } from "react-redux";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { store } = storeWrapper.useWrappedStore(pageProps);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default App;
