import { Container, Image, TextInput, NumberInput, Button } from '@mantine/core'
import { UseForm } from '@mantine/form/lib/types'

import { Book } from '../../../../../backend/src/book/book.schema'
import { UploadIcon } from '../../icons/UploadIcon'

const NewBookPage = ({ form, handleSubmit, loading }: Props) => {
  return (
    <Container className="mt-24">
      <h1 className="mb-8">New Book</h1>

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
            <div className="mt-12">
              <Button type="submit" loading={loading}>
                Create
              </Button>
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

type Props = {
  form: ReturnType<UseForm<Omit<Book, 'id'>>>
  handleSubmit: (_values: Omit<Book, 'id'>) => Promise<void>
  loading: boolean
}

export { NewBookPage }
