import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const tasksRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId

      const task = await ctx.prisma.task.create({
        data: {
          userId,
          task: input.content,
        },
      })

      return task
    }),
  get: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId

    const task = await ctx.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return task
  }),
  toggleStatus: privateProcedure
    .input(
      z.object({
        isDone: z.boolean(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.isDone,
        },
      })

      return task
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      })

      return 'Task with id ' + task.id + ' has been deleted'
    }),
  updateTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          task: input.task,
        },
      })

      return task
    }),
})
