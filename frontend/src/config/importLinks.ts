export interface ImportLink {
  title: string
  description: string
  href: string
  section: 'exploring' | 'migration'
}

export const IMPORT_EXTERNAL_LINKS = {
  PITCH_LINEAR: {
    title: 'Pitch Linear to your team',
    description:
      'Share why Linear is the right tool for your team. Get a walkthrough of features, pricing, and how other teams use it.',
    href: 'https://linear.app/',
    section: 'exploring',
  } as ImportLink,

  RUN_A_PILOT: {
    title: 'Run a pilot',
    description:
      'Try Linear with a small team before committing. Import a subset of your data and evaluate the experience firsthand.',
    href: 'https://linear.app/',
    section: 'exploring',
  } as ImportLink,

  MIGRATION_GUIDE: {
    title: 'Migration guide',
    description:
      'Follow our step-by-step guide to move your existing issues, projects, and workflows into Linear with minimal disruption.',
    href: 'https://linear.app/docs/migrating-to-linear',
    section: 'migration',
  } as ImportLink,
} as const
