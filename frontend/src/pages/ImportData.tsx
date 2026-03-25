/**
 * Authentication is handled entirely by Next.js middleware (`src/middleware.ts`).
 * The middleware validates the `cp_session` cookie and redirects unauthenticated
 * users to `/login` before this component ever renders. No component-level auth
 * logic is required here.
 */
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import ImportDataCard from '@/src/components/ImportData/ImportDataCard'
import {
  PITCH_LINEAR_URL,
  RUN_A_PILOT_URL,
  MIGRATION_GUIDE_URL,
} from '@/src/constants/externalLinks'
import styles from '@/src/components/ImportData/ImportDataPage.module.css'

/**
 * ImportData page — static, no async data fetches.
 *
 * Renders three informational cards that help users evaluate, pilot, and
 * migrate to Linear. Auth is handled by middleware; see JSDoc at top of file.
 */
const ImportData: NextPage = (): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>Import Data — CodePilot</title>
        <meta
          name="description"
          content="Evaluate, pilot, and migrate your data into Linear with CodePilot."
        />
      </Head>

      <div className={styles.page}>
        {/* ── Heading ──────────────────────────────────────────────────────── */}
        <div className={styles.hero}>
          <h1>Import Data</h1>
        </div>

        {/* ── 3-column card grid ───────────────────────────────────────────── */}
        <div className={styles.sections}>
          <ImportDataCard
            title="Pitch Linear"
            description="Evaluate whether Linear is the right fit for your team before committing."
            href={PITCH_LINEAR_URL}
            linkText="Learn more"
          />

          <ImportDataCard
            title="Run a Pilot"
            description="Roll out Linear with a small team first to build confidence before a full migration."
            href={RUN_A_PILOT_URL}
            linkText="Get started"
          />

          <ImportDataCard
            title="Migration Guide"
            description="Follow the step-by-step guide to move your existing data into Linear."
            href={MIGRATION_GUIDE_URL}
            linkText="View guide"
          />
        </div>

        {/* ── Contact Us hint ──────────────────────────────────────────────── */}
        <p
          style={{
            marginTop: '32px',
            fontSize: '0.875rem',
            color: '#a1a1aa',
          }}
        >
          <strong style={{ color: '#f4f4f5' }}>Contact Us</strong> — press{' '}
          <kbd
            style={{
              padding: '1px 5px',
              border: '1px solid #52525b',
              borderRadius: '4px',
              fontFamily: 'inherit',
              fontSize: '0.8125rem',
              color: '#f4f4f5',
              backgroundColor: '#27272a',
            }}
          >
            ?
          </kbd>{' '}
          in the bottom-left corner to get in touch with our team.
        </p>
      </div>
    </>
  )
}

export default ImportData
