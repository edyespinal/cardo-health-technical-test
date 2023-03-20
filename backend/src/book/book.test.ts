import { describe, expect, it } from 'vitest'

import { bookServices } from './book.services'

describe('Book services', () => {
  it('Should return all books', () => {
    const books = bookServices.getAllBooks()

    expect(books).toStrictEqual([
      {
        id: '999',
        title: 'Test book',
        author: 'Edy Espinal',
        year: undefined,
        cover: undefined,
      },
    ])
  })

  it('Should return a specific book', () => {
    const book = bookServices.getBook('999')

    expect(book).toStrictEqual({
      id: '999',
      title: 'Test book',
      author: 'Edy Espinal',
      year: undefined,
      cover: undefined,
    })
  })

  it('Should create a book', () => {
    const book = bookServices.createBook({
      title: 'Create book test',
      author: 'Edy Espinal',
    })

    expect(book).toStrictEqual({
      id: '2',
      title: 'Create book test',
      author: 'Edy Espinal',
      year: undefined,
      cover: undefined,
    })
  })

  it('Should throw error book already exists', () => {
    expect(() => {
      bookServices.createBook({
        title: 'Test book',
        author: 'Edy Espinal',
      })
    }).toThrowError()
  })
})
