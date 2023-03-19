import { z } from 'zod'

import { book } from '../book/book.schema'

export const user = z.object({
  id: z.string(),
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
  books: z.array(book),
})

export type User = z.infer<typeof user>
