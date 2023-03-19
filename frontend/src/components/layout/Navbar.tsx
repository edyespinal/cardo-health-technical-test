import {
  Avatar,
  Container,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { Link } from 'react-router-dom'

import { useSession } from '../../hooks/useSession'
import { logOut } from '../../services/session'

const Navbar = () => {
  const { user } = useSession()

  const handleLogOut = () => {
    logOut()

    window.location.href = '/auth/signup'
  }

  return (
    <Container fluid className="shadow-lg">
      <Container py={12} className="flex justify-between py-2 px-8 mb-8">
        <Link to="/">
          <Title color="brand" className="text-brand">
            CardoBooks
          </Title>
        </Link>

        <Menu shadow={'md'} width={200}>
          <Menu.Target>
            <UnstyledButton className="drop-shadow-lg">
              <Avatar size="md" radius="xl" color="violet" />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              <Text size="sm">{`${user?.firstName} ${user?.lastName}`} </Text>
            </Menu.Label>
            <Menu.Item onClick={handleLogOut}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </Container>
  )
}

export { Navbar }
