/* eslint-disable no-console */
import { Avatar, Container, Menu, Text, UnstyledButton } from '@mantine/core'

import { useSession } from '../../hooks/useSession'

const Navbar = () => {
  const { user } = useSession()

  return (
    <Container fluid p={0}>
      <div className="flex justify-between py-2 px-8 mb-8 shadow-lg">
        <h1 className="text-brand">CardoBooks</h1>
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
            <Menu.Item onClick={() => console.log('TODO: handleLogout')}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Container>
  )
}

export { Navbar }
