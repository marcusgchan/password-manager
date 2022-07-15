import { createRouter } from "../createRouter";
import { siteRouter } from "./site";
import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("site.", siteRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
