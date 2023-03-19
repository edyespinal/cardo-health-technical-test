import { Button, Container, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

import { Books } from '../components/pages/index/Books'
import { useSession } from '../hooks/useSession'

const Index = () => {
  const { user } = useSession()

  // eslint-disable-next-line no-console
  console.log({ user })

  return (
    <Container>
      <div className="mb-8 flex justify-between">
        <div>
          <Title order={2}>Hi, {user?.firstName} 👋🏼</Title>
          <Text>Welcome to CardoBooks</Text>
        </div>

        <div>
          <Link to="/books/new">
            <Button>Add new book</Button>
          </Link>
        </div>
      </div>

      <Books />
    </Container>
  )
}

export { Index }
