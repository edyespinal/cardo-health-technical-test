import { Container, Text, Title } from '@mantine/core'

import { EmptyState } from '../components/common/EmptyState'
import { BooksPage } from '../components/pages/books/BooksPage'
import { useSession } from '../hooks/useSession'
import { trpc } from '../utils/trpc'

const Index = () => {
  const { user } = useSession()

  const { data, isLoading, error } = trpc['get-user-books'].useQuery(user.email)

  if (isLoading) {
    return (
      <Container className="mt-24">
        <EmptyState />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-24">
        <EmptyState type="error" message="We couldn't find your books" />
      </Container>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container className="mt-12">
      <div className="mb-8">
        <Title order={2}>Hi, {user?.firstName} 👋🏼</Title>
        <Text>Welcome to CardoBooks</Text>
      </div>

      <BooksPage books={data} />
    </Container>
  )
}

export { Index }
