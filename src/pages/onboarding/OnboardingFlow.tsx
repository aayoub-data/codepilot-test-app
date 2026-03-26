import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import OnboardingFlowComponent from '../../components/onboarding/OnboardingFlow'
import { ProtectedRouteChildren, ROUTES } from '../../routes/index'

export default function OnboardingFlowPage(): React.JSX.Element {
  const router = useRouter()

  return (
    <ProtectedRouteChildren>
      <Head>
        <title>Get Started – CodePilot</title>
        <meta name="description" content="Set up your CodePilot workspace" />
      </Head>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl px-4 pt-6">
          <a
            href={`${ROUTES.IMPORT}?returnTo=/onboarding/OnboardingFlow`}
            className="text-sm text-indigo-400 hover:text-indigo-300 underline"
          >
            Open full import page →
          </a>
        </div>

        <OnboardingFlowComponent
          onComplete={() => {
            void router.push(ROUTES.DASHBOARD)
          }}
        />
      </div>
    </ProtectedRouteChildren>
  )
}
