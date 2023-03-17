import { User } from '../../../backend/src/user/types'

export interface Session {
  user?: Omit<User, 'password'>
  loading: boolean
}
