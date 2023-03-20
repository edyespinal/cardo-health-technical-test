import { TRPCError } from '@trpc/server'

import { users } from './user.data'
import { User } from './user.schema'

type CreateUserInput = Omit<User, 'id' | 'books'>
type UpdateUserBookInput = { email: string; bookId: string }

export const userServices = {
  getUser: function (input: string) {
    const user = users.find(({ email }) => email === input)

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: JSON.stringify({
          code: 'not_found',
          message: 'User not found',
        }),
      })
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      books: user.books,
    }
  },
  createUser: function (input: CreateUserInput) {
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
  },
  addUserBook: function (input: UpdateUserBookInput) {
    const { email, bookId } = input

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

    const userHasBook = users[userIndex].books.includes(bookId)

    if (userHasBook) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: JSON.stringify({
          code: 'already_exists',
          message: 'User already has book',
        }),
      })
    }

    users[userIndex].books.push(bookId)

    return true
  },
  removeUserBook: function (input: UpdateUserBookInput) {
    const { email, bookId } = input

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

    const bookIndex = users[userIndex].books.findIndex((id) => id === bookId)

    if (bookIndex < 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: JSON.stringify({
          code: 'not_found',
          message: "Unable to update user's book",
        }),
      })
    }

    users[userIndex].books.splice(bookIndex, 1)
  },
}
