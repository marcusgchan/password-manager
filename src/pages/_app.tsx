import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider, signIn, useSession } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>{<Component {...pageProps} />}</Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
}

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated") {
    return (
      <div>
        <h1>You are not logged in</h1>
        <button onClick={() => signIn()}>Login</button>
      </div>
    );
  }
  return children;
};

export default MyApp;
