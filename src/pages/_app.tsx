import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { NextComponentType } from "next";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/routers/app";
import { SnackbarProvider } from "../contexts/SnackbarContext";
import superjson from "superjson";

type CustomPageProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomPageProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <SnackbarProvider>
          {Component.auth ? (
            <Auth>{<Component {...pageProps} />}</Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
};

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
  return <>{children}</>;
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  // if (process.env.NEXTAUTH_URL) return `https://${process.env.NEXTAUTH_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    // const url = `${getBaseUrl()}/api/trpc`;
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
