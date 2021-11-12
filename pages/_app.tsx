import { AppProps } from "next/app";

/**
 * https://nextjs.org/learn/basics/assets-metadata-css/global-styles
 * Global Styles
 */
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
