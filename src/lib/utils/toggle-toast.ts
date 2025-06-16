let toastReference: HTMLElement | null

export function toggleToast(html?: string, options?: { closeAfter: number }) {
  removeToast()
  if (!html) return

  const element = document.createElement('div')
  element.innerHTML = html
  if (document.body) document.body.append(element)

  const close = element.querySelector('button')
  if (close) {
    close.addEventListener('click', removeToast, { once: true })
  }

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    // TODO: Refactor to use data-hotkey
    if (event.key === 'Escape') {
      if (removeToast()) event.stopImmediatePropagation()
    }
  })

  toastReference = element

  if (options?.closeAfter) {
    setTimeout(() => {
      if (toastReference === element) {
        removeToast()
      }
    }, options.closeAfter)
  }
}

function removeToast(): boolean {
  if (!toastReference) return false
  toastReference.remove()
  toastReference = null
  return true
}
