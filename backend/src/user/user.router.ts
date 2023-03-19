import { z } from 'zod'

import { user } from './user.schema'
import { userServices } from './user.services'
import { publicProcedure, router } from '../app/trpc'
import { book } from '../book/book.schema'

export const userRouter = router({
  'create-user': publicProcedure
    .input(user.omit({ id: true, books: true }))
    .mutation(({ input }) => userServices.createUser(input)),
  'update-user-books': publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        book: book,
      })
    )
    .mutation(({ input }) => userServices.updateUserBooks(input)),
})
