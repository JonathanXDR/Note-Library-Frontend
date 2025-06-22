'use client'

import { Blankslate } from '@primer/react/experimental'
import React from 'react'
import { isResponseError } from '../types/response-error'
import { ErrorPage } from './ErrorPage'

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  /**
   * Provide a callback to be invoked when an error is thrown (can be used for logging errors)
   */
  onError?: (error: Error) => void
  critical?: boolean
  appName?: string
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  /**
   * Invoked when an error is thrown in the child component,
   * and used to update state in a concurrent friendly manner
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  /**
   * Called _after_ the re-render, used for performing side-effects such as logging
   */
  override componentDidCatch(error: Error) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error)
    } else if (process.env.NODE_ENV === 'development') {
      console.error('Unhandled error caught by <ErrorBoundary>', error)
    }
  }

  private handleReset = () => {
    this.setState({ error: null })
  }

  override render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (!error) return children
    if (fallback) return fallback
    if (!fallback) return <ErrorPage type="httpError" />

    if (isResponseError(error)) {
      return (
        <Blankslate border={false} spacious={false}>
          <Blankslate.Heading>Unable to load page.</Blankslate.Heading>
          <Blankslate.Description>
            {`Status: ${error.response.status}  Message: ${error.message}`}
          </Blankslate.Description>
          <Blankslate.Description>
            Please reload page and try again
          </Blankslate.Description>
        </Blankslate>
      )
    }

    return (
      <Blankslate border={false} spacious={false}>
        <Blankslate.Heading>Unable to load page.</Blankslate.Heading>
        <Blankslate.Description>
          {error.message || 'An unexpected error occurred.'}
        </Blankslate.Description>
        <Blankslate.Description>
          Please reload page and try again
        </Blankslate.Description>
      </Blankslate>
    )
  }
}
