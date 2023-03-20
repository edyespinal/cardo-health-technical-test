import { useForm } from '@mantine/form'
import { useState } from 'react'

import { SignUpPage } from '../../components/pages/auth/SignUpPage'
import { createUserSession } from '../../utils/session'
import { trpc } from '../../utils/trpc'

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<SignUpFormValues>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      termsOfService: false,
    },
  })

  const { mutateAsync: createUser, isLoading } =
    trpc['create-user'].useMutation()

  const handleSubmit = (values: SignUpFormValues) => {
    createUser(values, {
      onSuccess: async (data) => {
        createUserSession(data)

        window.location.href = '/'
      },
      onError: (err) => {
        const parsedErr = JSON.parse(err.message)
        setErrorMessage(parsedErr[0].message)
      },
    })
  }

  return (
    <SignUpPage
      form={form}
      handleSubmit={handleSubmit}
      loading={isLoading}
      error={errorMessage}
    />
  )
}

export interface SignUpFormValues {
  email: string
  password: string
  firstName: string
  lastName: string
  termsOfService: boolean
}

export { SignUp }
