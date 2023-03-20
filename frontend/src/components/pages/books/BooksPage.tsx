import { Container } from '@mantine/core'
import { Link } from 'react-router-dom'

import { Book } from '../../../../../backend/src/book/book.schema'
import { BookCard } from '../../books/BookCard'
import { NewBookCard } from '../../books/NewBookCard'

const BooksPage = ({ books }: Props) => {
  const bookCards = books.map((book) => {
    return (
      <div key={book.id} className="max-w-xl">
        <Link to={`/books/${book.id}`}>
          <BookCard book={book} />
        </Link>
      </div>
    )
  })

  return (
    <Container fluid px={0} className="flex gap-8 flex-wrap">
      {bookCards}
      <NewBookCard />
    </Container>
  )
}

type Props = { books: Book[] }

export { BooksPage }
