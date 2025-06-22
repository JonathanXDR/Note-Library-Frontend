import { CommonElements } from '@/components/CommonElements'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { BaseProviders } from '@/providers/BaseProviders'
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
