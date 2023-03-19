import {
  Button,
  Checkbox,
  Container,
  Loader,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

import { createUserSession } from '../../services/session'
import { trpc } from '../../utils/trpc'

interface FormValues {
  email: string
  password: string
  firstName: string
  lastName: string
  termsOfService: boolean
}

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Something went wrong')

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      termsOfService: false,
    },
  })

  const createUser = trpc.createUser.useMutation()

  useEffect(() => {
    if (createUser.error?.message) {
      const err = JSON.parse(createUser.error?.message)
      setErrorMessage(err[0].message)
      setLoading(false)
    }
  }, [createUser.error])

  const handleSubmit = (values: FormValues) => {
    setLoading(true)

    const { email, password, firstName, lastName } = values

    createUser.mutateAsync(
      {
        email,
        password,
        firstName,
        lastName,
      },
      {
        onSuccess(data) {
          createUserSession(data)

          window.location.href = '/'
        },
      }
    )

    setLoading(false)
  }

  return (
    <Container fluid p={0} className="h-screen">
      <Container size="sm" className="h-full">
        <div className="h-full w-full grid place-items-center">
          <div className="w-full sm:w-3/5">
            <h1 className="font-semibold mb-8">Sign Up</h1>

            {createUser.isLoading && (
              <div className="grid place-items-center my-4 text-sm">
                <Loader />
                <Text>Creating user</Text>
              </div>
            )}

            {createUser.isError && (
              <Text className="my-4 text-center" size="sm" color="dimmed">
                {errorMessage ?? 'Something went wrong'} <br />
                <Text size="xs">
                  (We&apos;re not really handling errors on this demo)
                </Text>
              </Text>
            )}

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <div className="mb-4">
                <TextInput
                  label="Email"
                  placeholder="youremail@email.com"
                  required
                  withAsterisk
                  {...form.getInputProps('email')}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  label="First name"
                  placeholder="Edy"
                  required
                  withAsterisk
                  {...form.getInputProps('firstName')}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  label="Last name"
                  placeholder="Espinal"
                  required
                  withAsterisk
                  {...form.getInputProps('lastName')}
                />
              </div>
              <div className="mb-4">
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  required
                  withAsterisk
                  {...form.getInputProps('password')}
                />
              </div>
              <div className="mb-4">
                <Checkbox
                  label="I agree to terms of service"
                  required
                  {...form.getInputProps('termsOfService')}
                />
              </div>
              <div className="mt-12">
                <Button type="submit" fullWidth loading={loading}>
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Container>
  )
}

export { SignUp }
