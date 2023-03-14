import { bookRouter } from './book/router'
import { mergeRouters } from './trpc'
import { userRouter } from './user/router'

export const appRouter = mergeRouters(userRouter, bookRouter)

export type AppRouter = typeof appRouter
