import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ImportDataCard } from './ImportDataCard'

const DEFAULT_PROPS = {
  title: 'Import your data',
  description: 'Connect your existing tools to get started quickly.',
  href: 'https://docs.example.com/import',
}

describe('ImportDataCard', () => {
  test('test_renders_title_and_description', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} />)

    expect(screen.getByText(DEFAULT_PROPS.title)).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.description)).toBeInTheDocument()
  })

  test('test_all_external_links_have_correct_href_and_rel_attributes', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', DEFAULT_PROPS.href)
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('test_anchor_has_target_blank', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
  })

  test('test_anchor_has_rel_noopener_noreferrer', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('test_does_not_throw_with_arbitrary_url', () => {
    expect(() => {
      render(
        <ImportDataCard
          title="Arbitrary"
          description="Some description"
          href="https://example.com/arbitrary?q=1&r=2"
        />
      )
    }).not.toThrow()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com/arbitrary?q=1&r=2')
  })

  test('test_link_has_accessible_role', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  test('renders default link text when linkText prop is omitted', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} />)

    expect(screen.getByRole('link')).toHaveTextContent('Learn more')
  })

  test('renders custom link text when linkText prop is provided', () => {
    render(<ImportDataCard {...DEFAULT_PROPS} linkText="Get started" />)

    expect(screen.getByRole('link')).toHaveTextContent('Get started')
  })

  test('matches snapshot', () => {
    const { container } = render(<ImportDataCard {...DEFAULT_PROPS} />)
    expect(container).toMatchSnapshot()
  })
})
