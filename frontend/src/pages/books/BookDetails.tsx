import {
  Button,
  Container,
  Image,
  Loader,
  NumberInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useParams } from 'react-router-dom'

import { Book } from '../../../../backend/src/book/types'
import { UploadIcon } from '../../components/icons/Upload'
import { trpc } from '../../utils/trpc'

const BookDetails = () => {
  const params = useParams()
  const form = useForm<Book>()
  const updateBook = trpc.updateBook.useMutation()
  const deleteBook = trpc.deleteBook.useMutation()

  const { isLoading } = trpc.getBook.useQuery(params.id as string, {
    onSuccess(book) {
      form.setValues(book)
    },
  })

  const handleSubmit = async (values: Book) => {
    const updatedBook = await updateBook.mutateAsync(values)

    if (updatedBook) {
      window.location.href = '/'
    }
  }

  if (isLoading) {
    return <Loader />
  }

  const handleDelete = async () => {
    const res = await deleteBook.mutateAsync(form.values.id)

    if (res) {
      window.location.href = '/'
    }
  }

  return (
    <Container className="mt-24">
      <h1 className="mb-8">Book details</h1>

      <div className="flex gap-12">
        <div className="md:w-2/3 w-full">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="mb-4">
              <TextInput
                label="Title"
                required
                withAsterisk
                {...form.getInputProps('title')}
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Author"
                required
                withAsterisk
                {...form.getInputProps('author')}
              />
            </div>
            <div className="mb-4">
              <NumberInput
                label="Year of publication"
                {...form.getInputProps('year')}
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Book cover"
                icon={<UploadIcon />}
                {...form.getInputProps('cover')}
              />
            </div>
            <div className="mt-12 flex justify-between">
              <Button type="submit" loading={false}>
                Update
              </Button>

              <div className="text-red-700 hover:text-red-500 hover:cursor-pointer hover:underline">
                <Text onClick={handleDelete}>Delete book</Text>
              </div>
            </div>
          </form>
        </div>
        <div className="md:w-1/3 md:block hidden">
          <p className="mb-2 text-sm">Cover preview</p>
          <Image
            src={form.values.cover ?? import.meta.env.VITE_PLACEHOLDER_IMAGE}
          />
        </div>
      </div>
    </Container>
  )
}

export { BookDetails }
