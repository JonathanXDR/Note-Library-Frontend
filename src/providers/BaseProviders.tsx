'use client'

import { BaseStyles, ThemeProvider } from '@primer/react'
import type { PropsWithChildren } from 'react'
import { ToastContextProvider } from '../contexts/ToastContext'
import useColorModes from '../hooks/use-color-modes'

/**
 * This component provides the _base_ context for both apps and partials.
 * It should provide everything needed to render with styles, themes, and i18n.
 */
export function BaseProviders({ children }: PropsWithChildren) {
  const { colorMode, dayScheme, nightScheme } = useColorModes()

  return (
    <ThemeProvider
      colorMode={colorMode}
      dayScheme={dayScheme}
      nightScheme={nightScheme}
      preventSSRMismatch
    >
      <BaseStyles className="w-full h-full text-fg-default bg-default">
        <ToastContextProvider>{children}</ToastContextProvider>
      </BaseStyles>
    </ThemeProvider>
  )
}
