import type { History } from '@remix-run/router'
import { createContext } from 'react'
import {
  type Location,
  type Router as ReactRouterRouter,
  useRoutes,
} from 'react-router-dom'
import { type AppComponentType, AppWrapper } from '../components/AppWrapper'
import { ErrorPage } from '../components/ErrorPage'
import { AppPayloadContext } from '../hooks/use-app-payload'
import { RouteStateMap } from '../hooks/use-navigator'
import { RoutesContextProvider } from '../providers/RoutesContextProvider'
import type { PageError } from '../types/app-routing-types'
import type { NavigatorAppRegistration } from '../utils/navigator-app-registry'
import { RouteStateMapContext } from '../utils/route-state-map-context'

export const NavigationErrorContext = createContext<PageError | null>(null)

interface Props {
  App?: AppComponentType
  appPayload: unknown

  /**
   * Children will be included within the router context, but outside and after any routes.
   */
  children?: React.ReactNode
  error: PageError | null
  history: History
  location: Location
  navigateOnError: boolean
  Router: typeof ReactRouterRouter
  routes: NavigatorAppRegistration['routes']
  routeStateMap: RouteStateMap
}

/**
 * Given a list of React core routes and routing state, render the app. The implementation of this component should be
 * client/server agnostic, and differences probably should live in the appropriate Entry instead.
 */
export function NavigatorRouter({
  App,
  appPayload,
  children,
  error,
  history,
  location,
  navigateOnError,
  Router,
  routes,
  routeStateMap,
}: Props) {
  return (
    <RoutesContextProvider routes={routes}>
      {error && !navigateOnError ? (
        <ErrorPage {...error} />
      ) : (
        <AppPayloadContext.Provider value={appPayload}>
          <NavigationErrorContext.Provider value={error}>
            <RouteStateMapContext.Provider value={routeStateMap}>
              <Router
                location={location}
                navigator={history}
                future={{
                  v7_relativeSplatPath: true,
                }}
              >
                <AppRoutes routes={routes} App={App} />
                {children}
                {/* <RouterDevTools routes={routes} /> */}
              </Router>
            </RouteStateMapContext.Provider>
          </NavigationErrorContext.Provider>
        </AppPayloadContext.Provider>
      )}
    </RoutesContextProvider>
  )
}

function AppRoutes({ App, routes }: Pick<Props, 'routes' | 'App'>) {
  return useRoutes([{ element: <AppWrapper App={App} />, children: routes }])
}
