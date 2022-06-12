import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  // You can optionally pass the `user` prop from pages that require server-side
  // rendering to prepopulate the `useUser` hook.
  const { user } = pageProps;

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider user={user}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
