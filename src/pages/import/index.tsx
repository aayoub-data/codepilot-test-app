import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ImportYourData from '@/components/import/ImportYourData'

type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

export default function ImportPage(): React.JSX.Element {
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
      router.replace('/login')
    }
  }, [authState, router])

  if (authState === 'loading' || authState === 'unauthenticated') {
    return <></>
  }

  return (
    <>
      <Head>
        <title>Import Your Data</title>
        <meta name="description" content="Import your data into CodePilot" />
      </Head>
      <ImportYourData />
    </>
  )
}
