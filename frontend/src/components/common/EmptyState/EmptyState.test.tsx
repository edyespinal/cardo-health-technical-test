import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('Renders loading state', () => {
    render(<EmptyState />)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('Renders error state', async () => {
    render(<EmptyState type="error" />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('Renders error state with custom message', async () => {
    render(<EmptyState type="error" message="Custom error message" />)

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })
})
