import prisma from "lib/prisma";
import { isLoggedin } from "@/middleware/isLoggedin";
import { combineResolvers } from "graphql-resolvers";
// import { GraphQLError } from "graphql";

export const students = {
  Gender: {
    MALE: "MALE",
    FEMALE: "FEMALE",
  },
  Query: {
    student: combineResolvers(isLoggedin, async (_, { id }) => {
      return await prisma.student.findUnique({
        where: { id: Number(id) },
        include: {
          level: true,
        },
      });
    }),
    departments: combineResolvers(isLoggedin, async () => {
      return prisma.department.findMany({
        include: {
          levels: true,
        },
      });
    }),
    department: combineResolvers(isLoggedin, async (_, { id }) => {
      return prisma.department.findUnique({
        where: { id },
        include: {
          levels: true,
        },
      });
    }),
    levels: combineResolvers(isLoggedin, async () => {
      return prisma.level.findMany({
        include: {
          students: true,
          department: true,
        },
      });
    }),
    level: combineResolvers(isLoggedin, async (_, { id }) => {
      return prisma.level.findUnique({
        where: { id },
        include: {
          students: true,
          department: true,
        },
      });
    }),
    students: combineResolvers(isLoggedin, async () => {
      return prisma.student.findMany({
        include: {
          level: true,
        },
      });
    }),
    studentsByLevel: combineResolvers(isLoggedin, async (_, { levelId }) => {
      return prisma.student.findMany({
        where: { levelId },
        include: {
          level: true,
        },
      });
    }),
  },
  Mutation: {
    createStudent: combineResolvers(isLoggedin, async (_, { studentInput }) => {
      const { name, date, register, classification, password, gender } =
        studentInput;
      try {
        const student = await prisma.student.create({
          data: {
            name,
            date,
            register,
            classification,
            password,
            gender,
            level: {
              connect: {
                id: Number(studentInput.levelId),
              },
            },
          },
        });
        return student;
      } catch (error) {
        throw error;
      }
    }),
    deleteStudent: combineResolvers(isLoggedin, async (_, { id }) => {
      try {
        const student = await prisma.student.delete({
          where: {
            id: Number(id),
          },
        });
        return "تم حذف الطالب !";
      } catch (error) {
        throw error;
      }
    }),
  },
};