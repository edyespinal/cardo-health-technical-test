import { z } from 'zod'

import { user } from './user.schema'
import { userServices } from './user.services'
import { publicProcedure, router } from '../app/trpc'

export const userRouter = router({
  'get-user': publicProcedure
    .input(z.string().email())
    .query(({ input }) => userServices.getUser(input)),
  'create-user': publicProcedure
    .input(user.omit({ id: true, books: true }))
    .mutation(({ input }) => userServices.createUser(input)),
  'add-user-book': publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        bookId: z.string(),
      })
    )
    .mutation(({ input }) => userServices.addUserBook(input)),
  'remove-user-book': publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        bookId: z.string(),
      })
    )
    .mutation(({ input }) => userServices.removeUserBook(input)),
})
