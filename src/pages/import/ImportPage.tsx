import React from 'react'
import ImportOptions from '../../components/import/ImportOptions'
import ContactSupportLink from '../../components/import/ContactSupportLink'
import styles from './ImportPage.module.css'

export interface ImportPageProps {
  isAdmin?: boolean
}

function ImportPage({ isAdmin = true }: ImportPageProps): React.JSX.Element {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Import</h1>
        <p className={styles.subtitle}>
          Connect your data sources and migrate existing content into CodePilot.
        </p>
      </header>

      {!isAdmin && (
        <div
          className={styles.adminBanner}
          role="alert"
          aria-live="polite"
        >
          <p className={styles.adminBannerText}>
            You need admin permissions to configure imports. Contact your
            organisation admin to enable this feature.
          </p>
        </div>
      )}

      <main className={styles.content}>
        <ImportOptions />
      </main>

      <footer className={styles.footer}>
        <ContactSupportLink />
      </footer>
    </div>
  )
}

export { ImportPage }
export default ImportPage
