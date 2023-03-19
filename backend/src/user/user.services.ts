import { TRPCError } from '@trpc/server'

import { users } from './user.data'
import { User } from './user.schema'
import { books } from '../book/book.data'
import { Book } from '../book/book.schema'

type CreateUserInput = Omit<User, 'id' | 'books'>
type UpdateUserBooksInput = { email: string; book: Book }

export const userServices = {
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
  updateUserBooks: function (input: UpdateUserBooksInput) {
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
  },
}
