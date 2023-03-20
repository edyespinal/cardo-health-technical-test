import { User } from './user.schema'

// This serves as persistent data for this demo (DB)
export const users: User[] = [
  {
    id: '999',
    firstName: 'Edy',
    lastName: 'Espinal',
    email: 'edy@espinal.com',
    password: 'cardoPasswordInPlainText:(',
    books: ['999'],
  },
]
