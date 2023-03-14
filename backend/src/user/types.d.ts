import { Book } from '../book/types'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  books: Book[]
}
