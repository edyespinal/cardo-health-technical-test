import { z } from 'zod'

import { users } from './mock.data'
import { User } from './types'
import { publicProcedure, router } from '../trpc'

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(6, { message: 'Password must be at least 6 characters long.' })
          .max(128),
        firstName: z
          .string()
          .min(3, { message: 'Name must be at least 3 characters long.' }),
        lastName: z
          .string()
          .min(3, { message: 'Last name must be at least 3 characters long.' }),
      })
    )
    .mutation(({ input }) => {
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
})
