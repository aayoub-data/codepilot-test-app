import React from 'react'
import {
  PITCH_LINEAR_URL,
  RUN_A_PILOT_URL,
  MIGRATION_GUIDE_URL,
} from '../../constants/externalLinks'

function ImportOptions(): React.JSX.Element {
  return (
    <div>
      <section aria-labelledby="exploring-linear-heading">
        <h2 id="exploring-linear-heading">Exploring Linear</h2>
        <ul>
          <li>
            <a
              href={PITCH_LINEAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pitch Linear
            </a>
          </li>
          <li>
            <a
              href={RUN_A_PILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Run a pilot
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="ready-to-migrate-heading">
        <h2 id="ready-to-migrate-heading">Ready to migrate</h2>
        <ul>
          <li>
            <a
              href={MIGRATION_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Migration guide
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default ImportOptions
