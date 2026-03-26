import React from 'react';

export interface ImportPathwayCardProps {
  /** Card heading */
  title: string;
  /** Supporting text describing the import pathway */
  description: string;
  /** Destination URL opened in a new tab */
  href: string;
  /** Optional icon element rendered before the title */
  icon?: React.ReactNode;
  /** Optional text label rendered as a badge (ignored when icon is provided) */
  label?: string;
}

/**
 * ImportPathwayCard
 *
 * Renders a single import pathway with a title, description, and an external
 * link that opens in a new tab with the correct security attributes.
 * Fully keyboard-accessible via native <a> semantics.
 */
const ImportPathwayCard: React.FC<ImportPathwayCardProps> = ({
  title,
  description,
  href,
  icon,
  label,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=[
        'group flex flex-col gap-3 rounded-xl border border-gray-200',
        'bg-white p-5 shadow-sm transition-shadow duration-200',
        'hover:shadow-md focus:outline-none focus-visible:ring-2',
        'focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        'sm:p-6',
      ].join(' ')
      aria-label={`${title} — opens in a new tab`}
    >
      {/* Icon / label badge */}
      {(icon || label) && (
        <div className="flex items-center gap-2">
          {icon ? (
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
              aria-hidden="true"
            >
              {icon}
            </span>
          ) : label ? (
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {label}
            </span>
          ) : null}
        </div>
      )}

      {/* Text content */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-150">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      </div>

      {/* External link indicator */}
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-indigo-600">
        <span>Learn more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4zm6.5-1a.75.75 0 01.75-.75h4.75a.75.75 0 01.75.75v4.75a.75.75 0 01-1.5 0V6.06l-6.22 6.22a.75.75 0 11-1.06-1.06L14.94 5H11.5a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </a>
  );
};

export default ImportPathwayCard;
