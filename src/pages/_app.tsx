import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { AppContextProvider } from '../context/AppContext';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
};

export default MyApp;
