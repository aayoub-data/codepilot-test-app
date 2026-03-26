'use client'

import React from 'react'

export interface ImportDataCardProps {
  title: string
  description: string
  href: string
}

export function ImportDataCard({
  title,
  description,
  href,
}: ImportDataCardProps): React.JSX.Element {
  return (
    <div
      data-testid="import-data-card"
      style={{
        border: '1px solid #3f3f46',
        borderRadius: '8px',
        padding: '20px 24px',
        background: '#18181b',
        minWidth: '220px',
        flex: '1 1 220px',
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#a5b4fc',
          textDecoration: 'none',
        }}
      >
        {title}
      </a>
      <p
        style={{
          margin: 0,
          fontSize: '0.875rem',
          color: '#a1a1aa',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  )
}

export default ImportDataCard
