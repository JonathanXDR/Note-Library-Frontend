'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PageLayout } from '@primer/react'
import { PropsWithChildren } from 'react'

export default function PageLayoutProvider({ children }: PropsWithChildren) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <PageLayout.Content>{children}</PageLayout.Content>
      {/* <PageLayout.Pane>
      <Placeholder height={200}>Pane</Placeholder>
    </PageLayout.Pane> */}
      <PageLayout.Footer>
        <Footer />
      </PageLayout.Footer>
    </PageLayout>
  )
}
