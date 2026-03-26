'use client'

import React from 'react'
import { IMPORT_EXTERNAL_LINKS } from '../../config/importLinks'
import { ImportDataCard } from '../../components/import/ImportDataCard'
import styles from './import.module.css'

declare global {
  interface Window {
    Intercom?: (action: string) => void
  }
}

function ImportPage(): React.JSX.Element {
  function handleContactUs(event: React.MouseEvent<HTMLAnchorElement>): void {
    if (typeof window !== 'undefined' && typeof window.Intercom === 'function') {
      event.preventDefault()
      window.Intercom('show')
    }
  }

  return (
    <div className={styles.container}>
      <img
        src="/assets/import-your-data.png"
        alt="Import your data"
        className={styles.hero}
      />

      <section className={styles.section} aria-label="Exploring Linear">
        <h2 className={styles.sectionTitle}>Exploring Linear</h2>
        <div className={styles.cardsGrid}>
          <ImportDataCard
            title={IMPORT_EXTERNAL_LINKS.PITCH_LINEAR.title}
            description={IMPORT_EXTERNAL_LINKS.PITCH_LINEAR.description}
            href={IMPORT_EXTERNAL_LINKS.PITCH_LINEAR.href}
          />
          <ImportDataCard
            title={IMPORT_EXTERNAL_LINKS.RUN_A_PILOT.title}
            description={IMPORT_EXTERNAL_LINKS.RUN_A_PILOT.description}
            href={IMPORT_EXTERNAL_LINKS.RUN_A_PILOT.href}
          />
        </div>
      </section>

      <section className={styles.section} aria-label="Ready to migrate">
        <h2 className={styles.sectionTitle}>Ready to migrate</h2>
        <div className={styles.cardsGrid}>
          <ImportDataCard
            title={IMPORT_EXTERNAL_LINKS.MIGRATION_GUIDE.title}
            description={IMPORT_EXTERNAL_LINKS.MIGRATION_GUIDE.description}
            href={IMPORT_EXTERNAL_LINKS.MIGRATION_GUIDE.href}
          />
        </div>
      </section>

      <a
        href="/?showSupport=true"
        className={styles.contactUs}
        aria-label="Contact us"
        data-testid="contact-us-button"
        onClick={handleContactUs}
      >
        <span aria-hidden="true">?</span>
        <span className="sr-only">Contact us</span>
      </a>
    </div>
  )
}

export { ImportPage }
export default ImportPage
