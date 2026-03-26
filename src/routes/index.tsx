import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  IMPORT: '/import',
  ONBOARDING: '/onboarding',
  ONBOARDING_IMPORT: '/onboarding/import',
  DASHBOARD: '/dashboard',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export interface RouteConfig {
  path: string
  protected: boolean
  label: string
}

export const ROUTE_REGISTRY: RouteConfig[] = [
  { path: ROUTES.HOME, protected: false, label: 'Home' },
  { path: ROUTES.LOGIN, protected: false, label: 'Login' },
  { path: ROUTES.IMPORT, protected: true, label: 'Import' },
  { path: ROUTES.ONBOARDING, protected: true, label: 'Onboarding' },
  { path: ROUTES.ONBOARDING_IMPORT, protected: true, label: 'Onboarding Import' },
  { path: ROUTES.DASHBOARD, protected: true, label: 'Dashboard' },
]

// ---------------------------------------------------------------------------
// useAuthGuard — shared hook used by both ProtectedRoute variants
// ---------------------------------------------------------------------------

export function useAuthGuard(returnTo: string): AuthState {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>('loading')

  useEffect(() => {
    let cancelled = false

    async function checkAuth(): Promise<void> {
      try {
        const res = await fetch('/api/v1/auth/me', {
          credentials: 'include',
        })
        if (cancelled) return
        if (res.ok) {
          setAuthState('authenticated')
        } else {
          setAuthState('unauthenticated')
        }
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
      void router.replace(`${ROUTES.LOGIN}?returnTo=${encodeURIComponent(returnTo)}`)
    }
  }, [authState, router, returnTo])

  return authState
}

// ---------------------------------------------------------------------------
// ProtectedRoute (component-based)
// ---------------------------------------------------------------------------

export interface ProtectedRouteProps {
  path: string
  component: React.ComponentType
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps): React.JSX.Element {
  const authState = useAuthGuard(path)

  if (authState === 'loading' || authState === 'unauthenticated') {
    return <></>
  }

  return <Component />
}

// ---------------------------------------------------------------------------
// ProtectedRouteChildren — children-based wrapper
// ---------------------------------------------------------------------------

export interface ProtectedRouteChildrenProps {
  children: React.ReactNode
}

export function ProtectedRouteChildren({ children }: ProtectedRouteChildrenProps): React.JSX.Element {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>('loading')

  useEffect(() => {
    let cancelled = false

    async function checkAuth(): Promise<void> {
      try {
        const res = await fetch('/api/v1/auth/me', {
          credentials: 'include',
        })
        if (cancelled) return
        if (res.ok) {
          setAuthState('authenticated')
        } else {
          setAuthState('unauthenticated')
        }
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
      void router.replace(`${ROUTES.LOGIN}?returnTo=${encodeURIComponent(router.asPath)}`)
    }
  }, [authState, router])

  if (authState === 'loading' || authState === 'unauthenticated') {
    return <></>
  }

  return <>{children}</>
}

// ---------------------------------------------------------------------------
// Default export — route list with /import registered as protected
// ---------------------------------------------------------------------------

const routes = [
  {
    path: ROUTES.IMPORT,
    component: undefined as unknown as React.ComponentType,
    protected: true,
  },
]

export default routes
