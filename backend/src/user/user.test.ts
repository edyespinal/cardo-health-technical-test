import { describe, expect, it } from 'vitest'

import { userServices } from './user.services'

describe('User services', () => {
  it('Should return a specific user', () => {
    const user = userServices.getUser('edy@espinal.com')

    expect(user).toStrictEqual({
      id: '999',
      firstName: 'Edy',
      lastName: 'Espinal',
      email: 'edy@espinal.com',
      books: ['999'],
    })
  })

  it('Should create a user', () => {
    const user = userServices.createUser({
      firstName: 'Edy',
      lastName: 'Espinal',
      email: 'differentEdy@espinal.com',
      password: 'cardoPasswordInPlainText:(',
    })

    expect(user).toStrictEqual({
      id: '2',
      firstName: 'Edy',
      lastName: 'Espinal',
      email: 'differentEdy@espinal.com',
      password: 'cardoPasswordInPlainText:(',
      books: [],
    })
  })

  it('Should throw error email already in use', () => {
    expect(() => {
      userServices.createUser({
        firstName: 'Edy',
        lastName: 'Espinal',
        email: 'edy@espinal.com',
        password: 'cardoPasswordInPlainText:(',
      })
    }).toThrowError()
  })
})
