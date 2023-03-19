import { z } from 'zod'

export const book = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  year: z.number().min(0).max(9999).optional(),
  cover: z.string().optional(),
})

export type Book = z.infer<typeof book>
