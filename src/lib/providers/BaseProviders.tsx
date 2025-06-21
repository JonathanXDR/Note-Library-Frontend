'use client'

import { BaseStyles, ThemeProvider } from '@primer/react'
import type { ReactNode } from 'react'
import { ToastContextProvider } from '../contexts/ToastContext'
import useColorModes from '../hooks/use-color-modes'

interface Props {
  appName: string
  children?: ReactNode
}

/**
 * This component provides the _base_ context for both apps and partials.
 * It should provide everything needed to render with styles, themes, and i18n.
 */
export function BaseProviders({ appName, children }: Props) {
  const { colorMode, dayScheme, nightScheme } = useColorModes()

  return (
    <ThemeProvider
      colorMode={colorMode}
      dayScheme={dayScheme}
      nightScheme={nightScheme}
      preventSSRMismatch
    >
      <BaseStyles className="w-full h-full">
        <ToastContextProvider>{children}</ToastContextProvider>
      </BaseStyles>
    </ThemeProvider>
  )
}
