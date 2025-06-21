import { CommonElements } from '@/lib/components/CommonElements'
import { ErrorBoundary } from '@/lib/components/ErrorBoundary'
import { BaseProviders } from '@/lib/providers/BaseProviders'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GitHub Clone - Next.js 15',
  description: 'GitHub UI components ported to Next.js 15',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full h-full">
        <BaseProviders appName="GitHub Notes">
          <ErrorBoundary>
            <CommonElements />
            {children}
          </ErrorBoundary>
        </BaseProviders>
      </body>
    </html>
  )
}
