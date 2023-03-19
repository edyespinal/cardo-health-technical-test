import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { books } from './mock.data'
import { book, Book } from './types'
import { publicProcedure, router } from '../trpc'

export const bookRouter = router({
  getAllBooks: publicProcedure.query<Book[]>(() => {
    return books
  }),
  getBook: publicProcedure.input(z.string()).query(({ input }) => {
    const foundBook = books.find((bookElement) => bookElement.id === input)

    return foundBook
  }),
  createBook: publicProcedure
    .input(book.omit({ id: true }))
    .mutation(({ input }) => {
      const { title, author, year, cover } = input

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
    }),
  updateBook: publicProcedure.input(book).mutation(({ input }) => {
    const index = books.findIndex((bookElement) => bookElement.id === input.id)

    if (index < 0) {
      return false
    }

    books[index] = {
      ...books[index],
      ...input,
    }

    return true
  }),
  deleteBook: publicProcedure.input(z.string()).mutation(({ input }) => {
    const index = books.findIndex((bookElement) => bookElement.id === input)

    if (index < 0) {
      return false
    }

    books.splice(index, 1)

    return true
  }),
})
