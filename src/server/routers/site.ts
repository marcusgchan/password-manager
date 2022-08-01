import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../utils/prismaClient";
import { decrypt, encrypt } from "../../utils/cipher";
import { Context } from "../context";

const createSiteSchema = z.object({
  userId: z.string().max(255),
  name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().max(255),
});
export type Site = z.TypeOf<typeof createSiteSchema>;

const updateSiteSchema = createSiteSchema.extend({
  id: z.number().int(),
});

export const siteRouter = trpc
  .router<Context>()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  })
  .query("getSite", {
    input: z.number().int().max(255),
    async resolve(req) {
      const encryptedSite = await prisma.site.findFirst({
        where: { id: req.input, user: { id: req.ctx.user.id } },
      });
      if (encryptedSite) {
        return {
          ...encryptedSite,
          password: decrypt(encryptedSite.password),
        };
      }
      return null;
    },
  })
  .query("getSites", {
    async resolve({ ctx }) {
      const encryptedData = await prisma.site.findMany({
        where: {
          userId: ctx.user.id,
          user: { id: ctx.user.id },
        },
      });
      const data = encryptedData.map((data) => ({
        ...data,
        password: decrypt(data.password),
      }));
      return data;
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
  })
  .mutation("updateSite", {
    input: updateSiteSchema,
    async resolve(req) {
      const update = await prisma.user.update({
        where: { id: req.ctx.user.id },
        data: {
          sites: {
            update: { where: { id: req.input.id }, data: req.input },
          },
        },
      });
      return update;
    },
  });
