import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import 'animate.css';

import { SWRConfig } from 'swr';

import { AuthProvider } from '@/context';
import { UiProvider } from '@/context/ui';
import { lightTheme } from '@/themes/light-theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
