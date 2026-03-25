import React, { useEffect, useState } from 'react';

/**
 * HelpWidget
 *
 * Renders a '?' trigger button in the application layout and optionally
 * initialises a third-party help widget script.
 *
 * Gracefully degrades: if the underlying script is blocked, fails to load,
 * or throws during initialisation the component falls back to a plain button
 * that opens a mailto/docs link. No uncaught JS errors are ever propagated.
 */

interface HelpWidgetProps {
  /** Optional additional class name(s) for the trigger button. */
  className?: string;
}

const HelpWidget: React.FC<HelpWidgetProps> = ({ className = '' }) => {
  const [widgetReady, setWidgetReady] = useState<boolean>(false);
  const [initError, setInitError] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const initThirdPartyWidget = async (): Promise<void> => {
      try {
        // Attempt to initialise the third-party help widget.
        // This block is intentionally wrapped so that any error — including
        // script blocking, CSP violations, or runtime exceptions — is caught
        // and handled without propagating to the React tree.
        if (typeof window === 'undefined') {
          return;
        }

        // Example: window.HelpWidget?.init({ ... });
        // Replace or extend this block with the real SDK call when available.
        const widgetInit = (window as Record<string, unknown>)['HelpWidget'];
        if (typeof widgetInit === 'function') {
          (widgetInit as () => void)();
        }

        if (!cancelled) {
          setWidgetReady(true);
        }
      } catch (err) {
        // Log to console but never re-throw — graceful degradation.
        console.error('[HelpWidget] Failed to initialise third-party widget:', err);
        if (!cancelled) {
          setInitError(true);
        }
      }
    };

    initThirdPartyWidget();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (): void => {
    try {
      if (widgetReady) {
        // Attempt to open the third-party widget if it was initialised.
        const widgetOpen = (window as Record<string, unknown>)['HelpWidget'];
        if (widgetOpen && typeof (widgetOpen as Record<string, unknown>)['open'] === 'function') {
          ((widgetOpen as Record<string, unknown>)['open'] as () => void)();
          return;
        }
      }
    } catch (err) {
      console.error('[HelpWidget] Failed to open third-party widget:', err);
    }

    // Fallback: open documentation in a new tab.
    window.open('https://docs.codepilot.dev', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      aria-label="Help"
      data-testid="help-widget-trigger"
      onClick={handleClick}
      title={initError ? 'Help (offline)' : 'Help'}
      className={[
        'help-widget-trigger',
        'inline-flex items-center justify-center',
        'w-8 h-8 rounded-full',
        'bg-gray-100 hover:bg-gray-200',
        'text-gray-600 hover:text-gray-900',
        'text-sm font-semibold',
        'border border-gray-300',
        'cursor-pointer select-none',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type="button"
    >
      ?
    </button>
  );
};

export default HelpWidget;
