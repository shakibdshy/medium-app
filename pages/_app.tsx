import type { AppProps } from 'next/app'
import { NextPageWithLayout } from '../types';
import Layout from '../components/Layout';
import '../styles/globals.css'

// this should give a better typing
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
  // adjust accordingly if you disabled a layout rendering option
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Layout><Component {...pageProps} /></Layout>)

  // or swap the layout rendering priority
  // return getLayout(<Layout><Component {...pageProps} /></Layout>)
}

export default MyApp