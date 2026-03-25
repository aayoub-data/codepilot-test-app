/**
 * Import page route and external Linear URL constants.
 * Single source of truth for all import-related links.
 */

/** App route for the import page */
export const IMPORT_ROUTE = '/import';

/** External Linear URLs used on the import page */
export const IMPORT_LINKS = {
  PITCH_LINEAR: 'https://linear.app/switch/pitch-linear',
  RUN_A_PILOT: 'https://linear.app/switch/run-a-pilot',
  MIGRATION_GUIDE: 'https://linear.app/switch/migration-guide',
} as const;
