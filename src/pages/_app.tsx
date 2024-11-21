import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
