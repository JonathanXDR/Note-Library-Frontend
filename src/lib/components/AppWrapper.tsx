'use client'

import type { ReactNode } from 'react'

/**
 * Wraps an optional App component around the children.
 * In Next.js, this is typically used in layout components.
 */
export function AppWrapper({
  App,
  children,
}: {
  App?: AppComponentType
  children: ReactNode
}) {
  return App ? <App>{children}</App> : <>{children}</>
}

export type AppComponentType = React.ComponentType<{ children?: ReactNode }>
