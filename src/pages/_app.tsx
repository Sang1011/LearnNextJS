import axiosClient from "@/api/axios-client";
import { EmptyLayout } from "../components/layout";
import { AppPropsWithLayout } from "@/models";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createEmotionCache, theme } from "@/utils/index";

const swrConfigValue = {
  fetcher: (url: string) => axiosClient.get(url),
  shouldRetryOnError: false,
};

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  console.log("App re-render");

  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={swrConfigValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
