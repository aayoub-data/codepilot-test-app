/**
 * Central route registry for CodePilot.
 *
 * Each RouteConfig entry describes a client-side route: its path, whether it
 * requires authentication, and a lazily-loaded component. The PrivateRoute
 * wrapper replicates the auth-check pattern used in src/pages/import/index.tsx
 * and acts as a client-side safety net in addition to the server-side
 * middleware guard in src/middleware.ts.
 */
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RouteConfig {
  /** URL path for this route, e.g. '/import' */
  path: string
  /** Whether the route requires an authenticated session */
  protected: boolean
  /** Lazily-loaded page component */
  component: React.LazyExoticComponent<() => React.JSX.Element>
  /** Optional human-readable label used in navigation */
  label?: string
}

// ---------------------------------------------------------------------------
// Lazy-loaded page components
// ---------------------------------------------------------------------------

const ImportPage = lazy(
  () => import('../pages/import/index')
)

// ---------------------------------------------------------------------------
// PrivateRoute wrapper
// ---------------------------------------------------------------------------

type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

interface PrivateRouteProps {
  children: React.ReactNode
}

/**
 * Wraps a route that requires authentication.
 * Validates the current session via /api/v1/auth/me and redirects to /login
 * if the user is not authenticated.  Renders null during the async check so
 * that no protected content is briefly visible to unauthenticated users.
 */
export function PrivateRoute({ children }: PrivateRouteProps): React.JSX.Element | null {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>('loading')

  useEffect(() => {
    let cancelled = false

    async function checkAuth(): Promise<void> {
      try {
        const res = await fetch('/api/v1/auth/me', { credentials: 'include' })
        if (cancelled) return
        setAuthState(res.ok ? 'authenticated' : 'unauthenticated')
      } catch {
        if (!cancelled) {
          setAuthState('unauthenticated')
        }
      }
    }

    checkAuth()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (authState === 'unauthenticated') {
      router.replace('/login')
    }
  }, [authState, router])

  if (authState !== 'authenticated') {
    return null
  }

  return <>{children}</>
}

// ---------------------------------------------------------------------------
// Route registry
// ---------------------------------------------------------------------------

/**
 * Application route definitions.
 *
 * Add new routes here so that the full route surface is discoverable in one
 * place.  The `protected` flag controls whether PrivateRoute wraps the page.
 */
export const routes: RouteConfig[] = [
  {
    path: '/import',
    protected: true,
    component: ImportPage,
    label: 'Import',
  },
]

// ---------------------------------------------------------------------------
// Route renderer helper
// ---------------------------------------------------------------------------

interface RoutePageProps {
  route: RouteConfig
}

/**
 * Renders a route's component, wrapping it in PrivateRoute when the route is
 * marked as protected.  Suspense provides a lightweight fallback while the
 * lazy chunk is being fetched.
 */
export function RoutePage({ route }: RoutePageProps): React.JSX.Element {
  const { component: Component, protected: isProtected } = route

  const content = (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  )

  if (isProtected) {
    return <PrivateRoute>{content}</PrivateRoute>
  }

  return content
}

export default routes
