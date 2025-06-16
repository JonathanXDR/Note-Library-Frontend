import { useEffect } from 'react'
import { useToastContext } from '../contexts/ToastContext'
import { EXPECTED_ERRORS } from '../utils/expected-errors'

export function SSRErrorToast({ ssrError }: { ssrError: HTMLScriptElement }) {
  const { addToast } = useToastContext()
  const isExpectedError = EXPECTED_ERRORS[ssrError.textContent || '']

  useEffect(() => {
    if (!isExpectedError) {
      addToast({
        type: 'error',
        message: 'SSR failed, see console for error details (Staff Only)',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
