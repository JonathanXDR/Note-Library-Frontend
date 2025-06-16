import { createContext } from 'react'
import { RouteStateMap } from '../hooks/use-navigator'

export const RouteStateMapContext = createContext<RouteStateMap>({})
