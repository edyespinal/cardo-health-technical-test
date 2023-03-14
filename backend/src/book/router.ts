import { z } from 'zod'

import { books } from './mock.data'
import { Book } from './types'
import { publicProcedure, router } from '../trpc'

export const bookRouter = router({
  getAllBooks: publicProcedure.query<Book[]>(() => {
    return books
  }),
  getBook: publicProcedure.input(z.string()).query(({ input }) => {
    const foundBook = books.find((book) => book.id === input)

    return foundBook
  }),
  createBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        year: z.number().min(0).max(9999).optional(),
      })
    )
    .mutation((req) => {
      const { input } = req

      const book: Book = {
        id: String(books.length + 1),
        title: input.title,
        author: input.author,
        year: input.year,
      }

      books.push(book)

      return book
    }),
})
