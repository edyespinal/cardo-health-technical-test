import { User } from '../../../backend/src/user/types'

export interface Session {
  user?: Omit<User, 'password', 'books'>
  loading: boolean
}
