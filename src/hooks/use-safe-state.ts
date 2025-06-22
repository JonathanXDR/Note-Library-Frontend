'use client'

import { useCallback, useState } from 'react'
import useIsMounted from './use-is-mounted'

function useSafeState<T = undefined>(): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
]
function useSafeState<T>(
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>]

function useSafeState<T>(initialState?: T | (() => T)) {
  const isMounted = useIsMounted()
  const [state, setState] = useState(initialState)

  const setSafeState = useCallback(
    (value: React.SetStateAction<T | undefined>) => {
      if (isMounted()) {
        setState(value)
      }
    },
    [isMounted]
  )

  return [state, setSafeState]
}

export default useSafeState
