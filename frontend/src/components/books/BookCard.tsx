import { Card, Image, Text, Title } from '@mantine/core'

import { Book } from '../../../../backend/src/book/book.schema'

interface Props {
  book: Book
}

const BookCard = ({ book }: Props) => {
  return (
    <Card shadow="lg" className="w-52 h-80">
      <Card.Section>
        <Image
          src={book.cover ?? import.meta.env.VITE_PLACEHOLDER_IMAGE}
          height={200}
        />
      </Card.Section>
      <div className="absolute bottom-4">
        <Title order={4} lineClamp={1}>
          {book.title}
        </Title>
        <Text>{book.author}</Text>
        <Text color="dimmed" size="sm">
          {book.year ?? '-'}
        </Text>
      </div>
    </Card>
  )
}

export { BookCard }
