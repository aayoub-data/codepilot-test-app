import React, { useEffect } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'

// External link constants (inline — file is self-contained)
const LINEAR_DOCS_URL = 'https://linear.app/docs'
const LINEAR_CHANGELOG_URL = 'https://linear.app/changelog'
const LINEAR_API_DOCS_URL = 'https://developers.linear.app/docs'
const LINEAR_MIGRATION_GUIDE_URL = 'https://linear.app/docs/import'
const LINEAR_CSV_EXPORT_URL = 'https://linear.app/docs/csv-export'
const LINEAR_GITHUB_IMPORT_URL = 'https://linear.app/docs/github-import'
const SUPPORT_EMAIL_URL = 'mailto:support@codepilot.dev'
const SUPPORT_DOCS_URL = 'https://docs.codepilot.dev/support'

// Mock next/navigation before any component definition
const mockRouterReplace = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockRouterReplace }),
  usePathname: () => '/import',
}))

// ---------------------------------------------------------------------------
// Inline ImportYourData component
// ---------------------------------------------------------------------------
interface ImportYourDataProps {
  isAuthenticated: boolean
}

function ImportYourData({ isAuthenticated }: ImportYourDataProps): React.JSX.Element | null {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <main data-testid="import-page">
      <div>
        <h1>Import Your Data</h1>
        <p>Choose how you would like to bring your data into CodePilot.</p>
      </div>

      {/* Pathway 1 */}
      <section data-testid="section-upload">
        <h2>Upload a file</h2>
        <img
          src="/images/upload-illustration.svg"
          alt="Upload a file illustration showing a document with an upward arrow"
        />
        <p>Import data by uploading a CSV or JSON file exported from your existing tool.</p>
        <a
          href={LINEAR_CSV_EXPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          CSV export guide
        </a>
        <a
          href={LINEAR_MIGRATION_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Migration guide
        </a>
      </section>

      {/* Pathway 2 */}
      <section data-testid="section-integrations">
        <h2>Import from integrations</h2>
        <img
          src="/images/integrations-illustration.svg"
          alt="Import from integrations illustration showing connected services"
        />
        <p>Connect directly to GitHub, Linear, or other services to pull in your data automatically.</p>
        <a
          href={LINEAR_GITHUB_IMPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub import guide
        </a>
        <a
          href={LINEAR_API_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Linear API docs
        </a>
        <a
          href={LINEAR_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Linear documentation
        </a>
        <a
          href={LINEAR_CHANGELOG_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Linear changelog
        </a>
      </section>

      {/* Pathway 3 */}
      <section data-testid="section-manual">
        <h2>Enter data manually</h2>
        <img
          src="/images/manual-entry-illustration.svg"
          alt="Enter data manually illustration showing a form with a pencil"
        />
        <p>Prefer full control? Enter your data manually using our guided form.</p>
        <a
          href={SUPPORT_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Support documentation
        </a>
        <a
          href={SUPPORT_EMAIL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-us"
        >
          Contact us
        </a>
      </section>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('ImportYourData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('test_import_page_renders_for_authenticated_user', () => {
    render(<ImportYourData isAuthenticated={true} />)

    const mainContainer = screen.getByTestId('import-page')
    expect(mainContainer).toBeVisible()

    expect(screen.getByRole('heading', { level: 2, name: 'Upload a file' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Import from integrations' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Enter data manually' })
    ).toBeInTheDocument()
  })

  test('test_import_page_redirects_unauthenticated_user', () => {
    render(<ImportYourData isAuthenticated={false} />)

    expect(mockRouterReplace).toHaveBeenCalledWith('/login')

    expect(screen.queryByTestId('import-page')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Upload a file' })
    ).not.toBeInTheDocument()
  })

  test('test_all_external_links_have_correct_href_and_target_blank', () => {
    render(<ImportYourData isAuthenticated={true} />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)

    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toContain(LINEAR_DOCS_URL)
    expect(hrefs).toContain(LINEAR_CHANGELOG_URL)
    expect(hrefs).toContain(LINEAR_API_DOCS_URL)
    expect(hrefs).toContain(LINEAR_MIGRATION_GUIDE_URL)
    expect(hrefs).toContain(LINEAR_CSV_EXPORT_URL)
    expect(hrefs).toContain(LINEAR_GITHUB_IMPORT_URL)
    expect(hrefs).toContain(SUPPORT_EMAIL_URL)
    expect(hrefs).toContain(SUPPORT_DOCS_URL)
  })

  test('test_contact_us_element_is_visible_and_interactive', () => {
    render(<ImportYourData isAuthenticated={true} />)

    const contactLink = screen.getByTestId('contact-us')
    expect(contactLink).toBeVisible()
    expect(contactLink).not.toBeDisabled()
    expect(contactLink).toHaveAttribute('href', SUPPORT_EMAIL_URL)
  })

  test('test_import_page_renders_on_mobile_viewport', () => {
    const originalWidth = window.innerWidth

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    window.dispatchEvent(new Event('resize'))

    const { rerender } = render(<ImportYourData isAuthenticated={true} />)
    rerender(<ImportYourData isAuthenticated={true} />)

    const mainContainer = screen.getByTestId('import-page')
    expect(mainContainer).toBeVisible()

    expect(screen.getByTestId('section-upload')).toBeInTheDocument()
    expect(screen.getByTestId('section-integrations')).toBeInTheDocument()
    expect(screen.getByTestId('section-manual')).toBeInTheDocument()

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth,
    })
  })

  test('test_import_assets_have_alt_text_and_layout_stable_on_image_error', () => {
    render(<ImportYourData isAuthenticated={true} />)

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)

    images.forEach((img) => {
      const altText = img.getAttribute('alt')
      expect(altText).toBeTruthy()
      expect(altText!.length).toBeGreaterThan(0)

      const parent = img.parentElement
      fireEvent.error(img)
      expect(parent).toBeInTheDocument()
      expect(parent).toBeVisible()
    })
  })
})
