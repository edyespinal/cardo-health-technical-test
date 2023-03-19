import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { users } from './mock.data'
import { user, User } from './types'
import { books } from '../book/mock.data'
import { book } from '../book/types'
import { publicProcedure, router } from '../trpc'

export const userRouter = router({
  createUser: publicProcedure
    .input(user.omit({ id: true, books: true }))
    .mutation(({ input }) => {
      const userExists = users.some(
        (userElement) => userElement.email === input.email
      )

      if (userExists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: JSON.stringify([
            { code: 'already_exists', message: 'Email already in use' },
          ]),
        })
      }

      const newUser: User = {
        id: String(users.length + 1),
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
        books: [],
      }

      users.push(newUser)

      return newUser
    }),
  updateUserBooks: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        book: book,
      })
    )
    .mutation(({ input }) => {
      const { email, book: updatedBook } = input

      const userIndex = users.findIndex(
        (userElement) => userElement.email === email
      )

      if (userIndex < 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: JSON.stringify({
            code: 'not_found',
            message: "Unable to update user's book",
          }),
        })
      }

      const bookIndex = books.findIndex(
        (bookElement) => bookElement.id === updatedBook.id
      )

      if (bookIndex < 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: JSON.stringify({
            code: 'not_found',
            message: "Unable to update user's book",
          }),
        })
      }

      books[bookIndex] = updatedBook

      return true
    }),
})
