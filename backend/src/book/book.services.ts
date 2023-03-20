import { TRPCError } from '@trpc/server'

import { books } from './book.data'
import { Book } from './book.schema'
import { users } from '../user/user.data'

type CreateBookInput = Omit<Book, 'id'>

export const bookServices = {
  getAllBooks: function () {
    return books
  },
  getUserBooks: function (input: string) {
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

    const userBooks = books.filter(({ id }) => user.books.includes(id))

    return userBooks
  },
  getBook: function (input: string) {
    const foundBook = books.find(({ id }) => id === input)

    if (!foundBook) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: JSON.stringify({
          code: 'not_found',
          message: 'Book not found',
        }),
      })
    }

    return foundBook
  },
  createBook: function (book: CreateBookInput) {
    const { title, author, year, cover } = book

    const bookExists = books.some(
      (bookElement) =>
        bookElement.title === title &&
        bookElement.author === author &&
        bookElement.year === year
    )

    if (bookExists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: JSON.stringify({
          code: 'already_exists',
          message: 'This book already exists',
        }),
      })
    }

    const newBook: Book = {
      id: String(books.length + 1),
      title,
      author,
      year,
      cover,
    }

    books.push(newBook)

    return newBook
  },
  updateBook: function (book: Book) {
    const index = books.findIndex((bookElement) => bookElement.id === book.id)

    if (index < 0) {
      return false
    }

    books[index] = {
      ...books[index],
      ...book,
    }

    return true
  },
  deleteBook: function (input: string) {
    const index = books.findIndex(({ id }) => id === input)

    if (index < 0) {
      return false
    }

    books.splice(index, 1)

    return true
  },
}
