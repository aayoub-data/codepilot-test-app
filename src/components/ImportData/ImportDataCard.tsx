'use client'

import React from 'react'

export interface ImportDataCardProps {
  title: string
  description: string
  href: string
  linkText?: string
}

export function ImportDataCard({
  title,
  description,
  href,
  linkText = 'Learn more',
}: ImportDataCardProps): React.JSX.Element {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-card-foreground">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {linkText}
      </a>
    </div>
  )
}

export default ImportDataCard
