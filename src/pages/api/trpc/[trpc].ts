import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import prisma from "../../../utils/prisma-client";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getSites", {
    async resolve() {
      return await prisma.site.findMany();
    },
  })
  .mutation("createSite", {
    input: z.object({
      userId: z.string().max(255),
      name: z.string().max(255),
      email: z.string().max(255),
      password: z.string().max(255),
    }),
    async resolve(req) {
      const data = await prisma.site.create({
        data: {
          ...req.input,
        },
      });
      console.log(data);
      return {
        ...data,
        test: "hasdf",
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
