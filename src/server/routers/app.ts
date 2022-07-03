import { createRouter } from "../createRouter";
import { siteRouter } from "./site";

export const appRouter = createRouter().merge("site.", siteRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
