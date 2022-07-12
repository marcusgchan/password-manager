import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../utils/prismaClient";
import { encrypt } from "../../utils/cipher";

export const createSiteSchema = z.object({
  userId: z.string().max(255),
  name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().email().max(255),
});
export type Site = z.TypeOf<typeof createSiteSchema>;

export const siteRouter = trpc
  .router()
  .query("getSites", {
    async resolve({ ctx }) {
      if (!ctx) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await prisma.site.findMany();
    },
  })
  .mutation("createSite", {
    input: createSiteSchema,
    async resolve(req) {
      const encryptedPassword = encrypt(req.input.password);
      const data = await prisma.site.create({
        data: {
          ...req.input,
          password: encryptedPassword,
        },
      });
      return {
        ...data,
      };
    },
  });
