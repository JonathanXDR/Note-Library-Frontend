import { ThemeProvider } from '@primer/react'
import type { ReactNode } from 'react'
import { IsDataRouterEnabledContextProvider } from '../components/IsDataRouterEnabled'
import { ReportErrorContextProvider } from '../contexts/ReportErrorContext'
import { ToastContextProvider } from '../contexts/ToastContext'
import useColorModes from '../hooks/use-color-modes'

interface Props {
  appName: string
  children?: ReactNode
  wasServerRendered: boolean
  dataRouterEnabled: boolean
}

/**
 * This component provides the _base_ context for both apps and partials.
 * It should provide everything needed to render with styles, themes, and i18n.
 */
export function BaseProviders({
  appName,
  children,
  // wasServerRendered,
  dataRouterEnabled,
}: Props) {
  const { colorMode, dayScheme, nightScheme } = useColorModes()

  return (
    // <QueryClientProvider client={queryClient}>
    //   <RenderPhaseProvider wasServerRendered={wasServerRendered}>
    //     <AnalyticsProvider appName={appName} category="" metadata={metadata}>
    //       <PrimerFeatureFlags>
    <ThemeProvider
      colorMode={colorMode}
      dayScheme={dayScheme}
      nightScheme={nightScheme}
      preventSSRMismatch
    >
      <IsDataRouterEnabledContextProvider enabled={dataRouterEnabled}>
        <ReportErrorContextProvider appName={appName}>
          <ToastContextProvider>{children}</ToastContextProvider>
        </ReportErrorContextProvider>
      </IsDataRouterEnabledContextProvider>
    </ThemeProvider>
    //       </PrimerFeatureFlags>
    //     </AnalyticsProvider>
    //   </RenderPhaseProvider>
    // </QueryClientProvider>
  )
}
