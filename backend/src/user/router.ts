import { z } from 'zod'

import { users } from './mock.data'
import { User } from './types'
import { publicProcedure, router } from '../trpc'

export const userRouter = router({
  getAllUsers: publicProcedure.query<User[]>(() => {
    return users
  }),
  getUser: publicProcedure.input(z.string()).query(({ input }) => {
    const foundUser = users.find((user) => user.id === input)

    return foundUser
  }),
})
