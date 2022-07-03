import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../utils/prismaClient";
import { encrypt } from "../../utils/cipher";

export const siteRouter = trpc
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
    async resolve({ ctx }) {
      if (!ctx) throw new TRPCError({ code: "UNAUTHORIZED" });
      encrypt("test");
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
      // hash passwords

      const data = await prisma.site.create({
        data: {
          ...req.input,
        },
      });
      // console.log(data);
      return {
        ...data,
        test: "hasdf",
      };
    },
  });
