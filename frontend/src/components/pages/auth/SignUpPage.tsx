import {
  Container,
  Loader,
  Text,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form/lib/types'

import { SignUpFormValues } from '../../../pages/auth/SignUp'

const SignUpPage = ({ form, handleSubmit, loading, error }: Props) => {
  return (
    <Container fluid className="h-screen">
      <Container size="sm" className="h-full">
        <div className="h-full w-full grid place-items-center">
          <div className="w-full sm:w-3/5">
            <div className="mb-12">
              <Title align="center" color="brand" className="text-brand">
                CardoBooks
              </Title>
            </div>

            <h1 className="font-semibold mb-4">Sign Up</h1>

            {loading && (
              <div className="grid place-items-center my-4 text-sm">
                <Loader />
                <Text>Creating user</Text>
              </div>
            )}

            {error && (
              <Text className="my-4 text-center" size="sm" color="dimmed">
                {error ?? 'Something went wrong'} <br />
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

type Props = {
  form: UseFormReturnType<SignUpFormValues>
  handleSubmit: (_values: SignUpFormValues) => void
  loading: boolean
  error?: string
}

export { SignUpPage }
