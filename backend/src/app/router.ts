import { mergeRouters } from './trpc'
import { bookRouter } from '../book/book.router'
import { userRouter } from '../user/user.router'

export const appRouter = mergeRouters(userRouter, bookRouter)

export type AppRouter = typeof appRouter
