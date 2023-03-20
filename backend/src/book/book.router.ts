import { z } from 'zod'

import { book } from './book.schema'
import { bookServices } from './book.services'
import { publicProcedure, router } from '../app/trpc'

export const bookRouter = router({
  'get-all-books': publicProcedure.query(() => bookServices.getAllBooks()),
  'get-user-books': publicProcedure
    .input(z.string().email())
    .query(({ input }) => bookServices.getUserBooks(input)),
  'get-book': publicProcedure
    .input(z.string())
    .query(({ input }) => bookServices.getBook(input)),
  'create-book': publicProcedure
    .input(book.omit({ id: true }))
    .mutation(({ input }) => bookServices.createBook(input)),
  'update-book': publicProcedure
    .input(book)
    .mutation(({ input }) => bookServices.updateBook(input)),
  'delete-book': publicProcedure
    .input(z.string())
    .mutation(({ input }) => bookServices.deleteBook(input)),
})
