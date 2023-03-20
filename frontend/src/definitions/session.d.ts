import { User } from '../../../backend/src/user/user.schema'

export interface Session {
  user: Omit<User, 'password' | 'books'>
}
