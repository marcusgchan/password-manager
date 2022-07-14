import { createReactQueryHooks } from "@trpc/react";
import { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../server/routers/app";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

/**
 * Enum containing all api query paths
 */
export type TQuery = keyof AppRouter["_def"]["queries"];

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = InferQueryOutput<'hello'>
 */
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;
