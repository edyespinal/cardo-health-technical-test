import { Container, Loader, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

import { trpc } from '../../../utils/trpc'
import { BookCard } from '../../books/BookCard'

const Books = () => {
  const { data: books, isLoading, error } = trpc.getAllBooks.useQuery()

  if (error) {
    return <Text>Unable to get books :(</Text>
  }

  if (isLoading) {
    return <Loader />
  }

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
    </Container>
  )
}

export { Books }
