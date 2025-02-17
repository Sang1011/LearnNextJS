/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { createEmotionCache, theme} from "@/utils/index";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https:fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () => 
        originalRenderPage({
            enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />
        });
    
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));
    return {
        ...initialProps,
        styles:[...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
};

