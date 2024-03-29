import prisma from "lib/prisma";

export const users = {
  Query: {
    user: async (__, { id }) => {
      return await prisma.user.findUnique({ where: { id: Number(id) } });
    },
  },
};

/* import prisma from "lib/prisma";
import { isLoggedin } from "@/middleware/isLoggedin";
import { combineResolvers } from "graphql-resolvers";

export const users = {
  Query: {
    users: combineResolvers(isLoggedin, async () => {
      return await prisma.user.findMany()
    })
  }
};
 */
