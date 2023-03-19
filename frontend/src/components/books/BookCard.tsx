import { Card, Image, Text } from '@mantine/core'

import { Book } from '../../../../backend/src/book/types'

interface Props {
  book: Book
}

const BookCard = ({ book }: Props) => {
  return (
    <Card shadow="lg" className="w-56">
      <Card.Section>
        <div className="grid place-items-center">
          <Image
            src={book.cover ?? import.meta.env.VITE_PLACEHOLDER_IMAGE}
            height={200}
          />
        </div>
      </Card.Section>
      <Text>{book.title}</Text>
      <Text>{book.author}</Text>
      <Text>{book.year ?? '-'}</Text>
    </Card>
  )
}

export { BookCard }
