import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
// import unstable_getServerSession from "next-auth/next";
// import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getSession } from "next-auth/react";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const session = await getSession({ req });
  if (!session?.user) return null;
  return {
    user: session?.user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
