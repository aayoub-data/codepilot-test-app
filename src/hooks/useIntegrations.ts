import { useState, useEffect, useCallback, useRef } from 'react';

export interface Integration {
  slug: string;
  name: string;
  connected: boolean;
  connected_at?: string;
}

export interface IntegrationDirectoryEntry {
  slug: string;
  name: string;
  description: string;
  logo_url?: string;
}

interface UseIntegrationsReturn {
  integrations: Integration[];
  directory: IntegrationDirectoryEntry[];
  isLoading: boolean;
  error: string | null;
  connect(slug: string): Promise<void>;
  disconnect(slug: string): Promise<void>;
  isConnected(slug: string): boolean;
  refresh(): void;
  slugLoading: Record<string, boolean>;
  slugError: Record<string, string | null>;
}

const useIntegrations = (): UseIntegrationsReturn => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [directory, setDirectory] = useState<IntegrationDirectoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [slugLoading, setSlugLoading] = useState<Record<string, boolean>>({});
  const [slugError, setSlugError] = useState<Record<string, string | null>>({});
  const hasFetchedRef = useRef<boolean>(false);

  const fetchIntegrations = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const [integrationsRes, directoryRes] = await Promise.all([
        fetch('/api/integrations'),
        fetch('/api/integrations/directory'),
      ]);

      if (!integrationsRes.ok) {
        throw new Error(`Failed to fetch integrations: ${integrationsRes.status} ${integrationsRes.statusText}`);
      }
      if (!directoryRes.ok) {
        throw new Error(`Failed to fetch integration directory: ${directoryRes.status} ${directoryRes.statusText}`);
      }

      const integrationsData: Integration[] = await integrationsRes.json();
      const directoryData: IntegrationDirectoryEntry[] = await directoryRes.json();

      setIntegrations(integrationsData);
      setDirectory(directoryData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error fetching integrations';
      console.error('[useIntegrations] fetchIntegrations error:', message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback((): void => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  const isConnected = useCallback(
    (slug: string): boolean => {
      return integrations.some((i) => i.slug === slug && i.connected);
    },
    [integrations]
  );

  const connect = useCallback(
    async (slug: string): Promise<void> => {
      // Deduplicate: do not reinitiate OAuth if already connected
      if (isConnected(slug)) {
        return;
      }

      setSlugLoading((prev) => ({ ...prev, [slug]: true }));
      setSlugError((prev) => ({ ...prev, [slug]: null }));

      try {
        const res = await fetch(`/api/integrations/${slug}/connect`, {
          method: 'POST',
        });

        if (!res.ok) {
          throw new Error(`Failed to initiate OAuth for ${slug}: ${res.status} ${res.statusText}`);
        }

        const data: { oauth_url: string } = await res.json();
        window.location.href = data.oauth_url;
      } catch (err) {
        const message = err instanceof Error ? err.message : `Unknown error connecting ${slug}`;
        console.error(`[useIntegrations] connect(${slug}) error:`, message);
        setSlugError((prev) => ({ ...prev, [slug]: message }));
      } finally {
        setSlugLoading((prev) => ({ ...prev, [slug]: false }));
      }
    },
    [isConnected]
  );

  const disconnect = useCallback(
    async (slug: string): Promise<void> => {
      setSlugLoading((prev) => ({ ...prev, [slug]: true }));
      setSlugError((prev) => ({ ...prev, [slug]: null }));

      try {
        const res = await fetch(`/api/integrations/${slug}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error(`Failed to disconnect ${slug}: ${res.status} ${res.statusText}`);
        }

        // Invalidate cache by re-fetching after disconnect
        await fetchIntegrations();
      } catch (err) {
        const message = err instanceof Error ? err.message : `Unknown error disconnecting ${slug}`;
        console.error(`[useIntegrations] disconnect(${slug}) error:`, message);
        setSlugError((prev) => ({ ...prev, [slug]: message }));
      } finally {
        setSlugLoading((prev) => ({ ...prev, [slug]: false }));
      }
    },
    [fetchIntegrations]
  );

  // Initial fetch (strict-mode safe via ref guard)
  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }
    hasFetchedRef.current = true;
    fetchIntegrations();
  }, [fetchIntegrations]);

  // Handle OAuth callback URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthSlug = params.get('oauth_slug');
    const oauthStatus = params.get('oauth_status');
    const oauthErrorMsg = params.get('oauth_error');

    if (!oauthSlug || !oauthStatus) {
      return;
    }

    if (oauthStatus === 'error') {
      const message = oauthErrorMsg ?? `OAuth failed for ${oauthSlug}`;
      console.error(`[useIntegrations] OAuth callback error for ${oauthSlug}:`, message);
      setSlugError((prev) => ({ ...prev, [oauthSlug]: message }));
    } else if (oauthStatus === 'success') {
      setSlugError((prev) => ({ ...prev, [oauthSlug]: null }));
    }

    // Refresh list to reflect updated connection state
    refresh();
  }, [refresh]);

  return {
    integrations,
    directory,
    isLoading,
    error,
    connect,
    disconnect,
    isConnected,
    refresh,
    slugLoading,
    slugError,
  };
};

export default useIntegrations;
