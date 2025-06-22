'use client'

import { AlertIcon } from '@primer/octicons-react'
import { Spinner } from '@primer/react'
import { Dialog } from '@primer/react/experimental'
import {
  type FormEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import type { EmojiAttributes } from './Emoji'

export interface UserStatus {
  messageHtml?: string
  emojiAttributes?: EmojiAttributes
}

async function saveUserStatus(body: FormData) {
  // put method is required for the endpoint to accept the request
  body.set('_method', 'put')
  const response = await fetch('/users/status', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body,
  })
  return response.json() as Promise<UserStatus>
}

export function UserStatusDialog({
  onClose,
}: {
  onClose: (statusResponse?: Promise<UserStatus> | string) => void
}) {
  const [fragmentLoaded, setFragmentLoaded] = useState(false)
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const fragmentRef = useRef<HTMLDivElement>(null)
  const formId = useId()

  useEffect(() => {
    fetch('/users/status', {
      headers: { Accept: 'text/fragment+html' },
    })
      .then((res) => res.text())
      .then((html) => {
        setContent(html)
        setFragmentLoaded(true)
      })
      .catch(() => setError(true))
  }, [])

  const onFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const data = new FormData(e.target as HTMLFormElement)
      onClose(saveUserStatus(data))
    },
    [onClose]
  )

  const onClearStatus = useCallback(() => {
    // Fire and forget an empty request to clear the status
    void saveUserStatus(new FormData())

    // Immediately close with cleared status
    onClose(Promise.resolve({}))
  }, [onClose])

  return (
    <Dialog
      width="large"
      title="Edit status"
      onClose={onClose}
      footerButtons={[
        {
          buttonType: 'normal',
          content: 'Clear status',
          onClick: onClearStatus,
        },
        {
          buttonType: 'primary',
          type: 'submit',
          content: 'Set status',
          form: formId,
          disabled: !fragmentLoaded,
        },
      ]}
    >
      <form
        id={formId}
        onSubmit={onFormSubmit}
        className="user-status-dialog-fragment js-user-status-container"
      >
        <div
          ref={fragmentRef}
          data-testid="user-status-dialog-include-fragment"
        >
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : error ? (
            <p className="flash flash-error mb-0 mt-2">
              <AlertIcon />
              Sorry, something went wrong and we were not able to fetch the user
              settings form
            </p>
          ) : (
            <p className="text-center mt-3">
              <Spinner />
            </p>
          )}
        </div>
      </form>
    </Dialog>
  )
}
