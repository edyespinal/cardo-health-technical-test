import { TRPCError } from '@trpc/server'

import { books } from './book.data'
import { Book } from './book.schema'
import { users } from '../user/user.data'

type CreateBookInput = Omit<Book, 'id'>

export const bookServices = {
  getAllBooks: function () {
    return books
  },
  getUserBooks: function (email: string) {
    const user = users.find((userElement) => userElement.email === email)

    return user
  },
  getBook: function (id: string) {
    const foundBook = books.find((bookElement) => bookElement.id === id)

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
  deleteBook: function (id: string) {
    const index = books.findIndex((bookElement) => bookElement.id === id)

    if (index < 0) {
      return false
    }

    books.splice(index, 1)

    return true
  },
}
