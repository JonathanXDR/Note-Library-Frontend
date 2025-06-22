import { announce } from '@github-ui/aria-live'
import { onFocus, onKey } from '@github-ui/onfocus'
import { observe } from '@github/selector-observer'
import { on } from 'delegated-events'
import { validate } from './github/behaviors/html-validation'

/*
  When any input field is focused, validate the dirty fields
  This is necessary because the fields only validate on blur and the user may not have clicked the email field before
  submitting as it could be prefilled
*/
onFocus('.js-auto-check-input', validateDirtyFields)

onKey('keyup', '.js-password-confirm', validatePasswordConfirmation)

onKey('keyup', '.js-password-with-confirmation', () => {
  const passwordConfirmField = document.querySelector<HTMLInputElement>(
    '.js-password-confirm'
  )!
  if (passwordConfirmField.value !== '') {
    validatePasswordConfirmation()
  }
})

// Move the stale session flash above the header
// This pairs with a css change to the stale session flash in signup-nux.scss to put it above the header
// Without this, the flash will cover the header
observe('.js-stale-session-flash', function (flash) {
  const header = document.querySelector<HTMLElement>('.signups-rebrand__header')
  if (!header) return

  header.parentElement?.insertBefore(flash, header)
})

// Add suggested usernames to form
observe('.js-suggested-usernames-container', function (container) {
  const suggestions = container.querySelectorAll<HTMLInputElement>(
    '.js-suggested-username'
  )
  const form = document.querySelector('.js-signup-form')

  if (!form || suggestions.length === 0) {
    return
  }

  for (const suggestion of suggestions) {
    form.appendChild(suggestion)
  }
})

observe('.js-octocaptcha-parent', function (form) {
  const spinner = form.querySelector<HTMLElement>('.js-octocaptcha-spinner')!
  const success = form.querySelector<HTMLElement>('.js-octocaptcha-success')!
  const input = form.querySelector<HTMLInputElement>('.js-octocaptcha-token')!
  const formSubmit = form.querySelector<HTMLButtonElement>(
    '.js-octocaptcha-form-submit'
  )!
  const iframe = form.querySelector<HTMLIFrameElement>('.js-octocaptcha-frame')!
  const octocaptchaUrl = input.getAttribute('data-octocaptcha-url')
  const dataCaptchaTimeout = input.getAttribute('data-octocaptcha-timeout')
  const captchaTimeout = dataCaptchaTimeout
    ? parseInt(dataCaptchaTimeout)
    : 30000
  const dynamicallyLoadCaptcha =
    input.getAttribute('data-dynamically-load-captcha') === 'true'

  let loaded = false

  const showSuccess = () => {
    if (loaded) return
    loaded = true

    spinner.classList.add('d-none')

    success.classList.remove('d-none')
    formSubmit.disabled = false
    formSubmit.hidden = false
    if (dynamicallyLoadCaptcha) formSubmit.focus()
  }

  const showCaptcha = (height: number, width: number) => {
    if (loaded) return
    loaded = true

    spinner.classList.add('d-none')
    iframe.classList.remove('v-hidden')
    iframe.style.height = `${height}px`
    iframe.style.width = `${width}px`
    iframe.contentWindow?.postMessage(
      { event: 'captcha-loaded-ack' },
      octocaptchaUrl || ''
    )
  }

  const showFailedToLoadSuccess = () => {
    if (loaded) return
    const hiddenInput = document.createElement('input')
    hiddenInput.type = 'hidden'
    hiddenInput.id = 'error_loading_captcha'
    hiddenInput.name = 'error_loading_captcha'
    hiddenInput.value = '1'

    form.appendChild(hiddenInput)
    input.required = false

    showSuccess()
  }

  const captchaComplete = () => {
    if ((form as HTMLFormElement).checkValidity()) {
      formSubmit.disabled = false
    }
    if (dynamicallyLoadCaptcha) {
      setTimeout(() => {
        formSubmit.click()
      }, 0)
    } else {
      formSubmit.hidden = false
    }
  }

  if (dynamicallyLoadCaptcha) {
    const loadCaptchaButton = form.querySelector<HTMLIFrameElement>(
      '.js-octocaptcha-load-captcha'
    )!
    const elementsToHide = form.querySelectorAll<HTMLElement>(
      '.js-octocaptcha-hide'
    )
    const dataFields = form.querySelectorAll<HTMLInputElement>(
      '.js-octocaptcha-data-field'
    )
    const src = iframe.getAttribute('data-src') || ''
    const userFields = form.querySelectorAll<HTMLInputElement>(
      '.signup-form-fields__input, .signup-form-fields__select'
    )
    let triggered = false

    // As a user tabs through the form, display errors for blank fields onBlur
    displayErrorsForBlankFields(userFields, true)

    /*
      When the user hovers over the continue button, perform validation on all dirty fields
      This is necessary because the fields only validate on blur and the user may not have clicked out of a field
      before submitting
    */
    loadCaptchaButton.addEventListener('mouseenter', () => {
      validateDirtyFields()
    })

    loadCaptchaButton.addEventListener('click', () => {
      if (triggered) return
      triggered = true

      // When the user clicks the button, check all fields and display error messages on all blank fields
      displayErrorsForBlankFields(userFields)

      const captchaContainer = document.getElementById('captcha-container-nux')!
      const invalidUserFields = []
      for (const field of userFields) {
        // Check validity does not work on the select panel so we need to check the class
        if (field.tagName === 'SELECT-PANEL') {
          const fieldParent = field.closest('.signup-form-fields__validate')
          const errorDiv = fieldParent?.querySelector('.nux-error')
          if (errorDiv) {
            invalidUserFields.push(field)
          }
        } else if (field instanceof HTMLInputElement) {
          if (!field.checkValidity()) {
            invalidUserFields.push(field)
          }
        }
      }

      if (captchaContainer && invalidUserFields.length > 0) {
        const fieldParent = invalidUserFields[0]?.closest(
          '.signup-form-fields__validate'
        )
        if (invalidUserFields[0]!.tagName === 'SELECT-PANEL') {
          const selectPanelButton = fieldParent?.querySelector(
            'button'
          ) as HTMLInputElement
          selectPanelButton.focus()
        } else {
          invalidUserFields[0]!.focus()
        }
        triggered = false
        const errorDiv = fieldParent?.querySelector('.nux-error')
        const errorMessage = errorDiv?.querySelector('p')
        const errorText = errorMessage?.textContent?.trim()
        if (errorText) {
          return announce(errorText)
        }
        return
      } else {
        if (captchaContainer) {
          captchaContainer.hidden = false
          setTimeout(() => {
            captchaContainer
              .querySelector<HTMLElement>('.js-octocaptcha-focus-target')!
              .focus()

            const heading = document
              .getElementById('verify-account-header')
              ?.textContent?.trim()

            const helperText = document
              .querySelector('[data-theme="home.instructions"]')
              ?.textContent?.trim()

            setTimeout(
              () => announce(heading ? heading : 'Verify your account'),
              100
            )
            setTimeout(
              () =>
                announce(
                  helperText
                    ? helperText
                    : 'Please solve a puzzle so we can safely create your account.'
                ),
              1000
            )
          }, 0)
        }

        for (const e of elementsToHide) {
          e.hidden = true
        }
      }

      const octocaptchaData: Record<string, string> = {}
      for (const f of dataFields) {
        const name = f.getAttribute('data-octocaptcha-field-name') ?? f.name
        octocaptchaData[name] = f.value
      }

      const url = new URL(src, octocaptchaUrl || 'https://octocaptcha.com')
      const params = url.searchParams

      params.set('data', JSON.stringify(octocaptchaData))
      iframe.src = url.toString()
      setTimeout(showFailedToLoadSuccess, captchaTimeout)
    })
  } else {
    setTimeout(showFailedToLoadSuccess, captchaTimeout)
  }

  // If captcha fails to load, let the user through
  iframe.addEventListener('error', showFailedToLoadSuccess)

  window.addEventListener('message', (e) => {
    if (e.origin !== octocaptchaUrl) return

    const event = e.data && e.data.event

    if (event === 'captcha-loaded') {
      const height = e.data.height || 380
      const width = e.data.width || 654
      showCaptcha(height, width)
    } else if (event === 'captcha-complete') {
      input.value = e.data.sessionToken
      captchaComplete()
    } else if (event === 'captcha-suppressed') {
      showSuccess()
    }
  })
})

observe('.js-survey-answer-choice:checked', {
  add(input) {
    const answer = input.closest('.js-answer')
    if (answer) {
      const answerChoice = answer.querySelector('.js-answer-choice')
      if (answerChoice) {
        answerChoice.classList.remove('color-border-subtle', 'color-bg-default')
        answerChoice.classList.add(
          'color-border-accent-emphasis',
          'color-bg-accent'
        )
      }
    }

    const otherRoleInput = document.querySelector(
      `.js-other-input-box[data-other-input-for=${input.getAttribute('data-question-short-text')}]`
    )

    if (
      otherRoleInput instanceof HTMLElement &&
      input.classList.contains('js-other-choice')
    ) {
      otherRoleInput.hidden = false
    }
  },
  remove(input) {
    const answer = input.closest('.js-answer')
    if (answer) {
      const answerChoice = answer.querySelector('.js-answer-choice')
      if (answerChoice) {
        answerChoice.classList.remove(
          'color-border-accent-emphasis',
          'color-bg-accent'
        )
        answerChoice.classList.add('color-border-subtle', 'color-bg-default')
      }
    }

    const otherRoleInput = document.querySelector(
      `.js-other-input-box[data-other-input-for=${input.getAttribute('data-question-short-text')}]`
    )

    if (
      otherRoleInput instanceof HTMLElement &&
      input.classList.contains('js-other-choice')
    ) {
      otherRoleInput.hidden = true
    }
  },
})

observe('.js-allow-multiple:checked', {
  constructor: HTMLInputElement,
  add(input) {
    const maximumAllowedAnswers = parseInt(
      input.getAttribute('data-max-choices') || ''
    )

    const parentQuestion = input.closest<HTMLElement>('.js-question')!
    const allAnswers =
      parentQuestion.querySelectorAll<HTMLInputElement>('.js-allow-multiple')
    const selectedAnswerCount = Array.from(allAnswers).filter(
      (el) => el.checked === true
    ).length

    // Disable a question's unchecked answers when three or more are selected
    if (selectedAnswerCount >= maximumAllowedAnswers) {
      for (const answer of allAnswers) {
        if (answer.checked === false) {
          answer.disabled = true
        }
      }
    }
  },
  remove(input) {
    const parentQuestion = input.closest<HTMLElement>('.js-question')!

    for (const answer of parentQuestion.querySelectorAll<HTMLInputElement>(
      '.js-allow-multiple'
    )) {
      answer.disabled = false
    }
  },
})

function validateDirtyFields() {
  const userFields = document.querySelectorAll<HTMLInputElement>(
    '.js-auto-check-input'
  )
  for (const f of userFields) {
    const autoCheckElement = f.closest('auto-check')!
    // Only validate if the field is dirty
    if (autoCheckElement.hasAttribute('dirty')) {
      autoCheckElement.triggerValidation()
    }
  }
}

function validatePasswordConfirmation() {
  const passwordField = document.querySelector<HTMLInputElement>(
    '.js-password-with-confirmation'
  )!
  const passwordConfirmField = document.querySelector<HTMLInputElement>(
    '.js-password-confirm'
  )!

  if (passwordConfirmField.value !== passwordField.value) {
    showPasswordValidationError(passwordConfirmField)
  } else {
    hidePasswordValidationError(passwordConfirmField)
  }
}

function showPasswordValidationError(passwordConfirmField: HTMLInputElement) {
  const passwordConfirmFormGroup =
    passwordConfirmField.closest<HTMLElement>('.js-form-group')!
  passwordConfirmFormGroup.classList.add('errored')

  const validityMessage = passwordConfirmField.getAttribute(
    'data-validity-message'
  )
  if (validityMessage) {
    passwordConfirmField.setCustomValidity(validityMessage)
    const form = passwordConfirmField.closest<HTMLFormElement>('form')!
    validate(form)
  }

  const errorNode = passwordConfirmFormGroup.querySelector('.error')
  const errorText = passwordConfirmField.getAttribute('data-error-message')
  if (!errorNode && errorText) {
    const newErrorNode = document.createElement('dd')
    newErrorNode.classList.add('error')
    newErrorNode.textContent = errorText
    passwordConfirmFormGroup.appendChild(newErrorNode)
  }
}

function hidePasswordValidationError(passwordConfirmField: HTMLInputElement) {
  const passwordConfirmFormGroup =
    passwordConfirmField.closest<HTMLElement>('.js-form-group')!
  passwordConfirmField.setCustomValidity('')
  passwordConfirmFormGroup.classList.remove('errored')
  const form = passwordConfirmField.closest<HTMLFormElement>('form')!
  validate(form)

  const errorNode = passwordConfirmFormGroup.querySelector('.error')
  if (errorNode) {
    passwordConfirmFormGroup.removeChild(errorNode)
  }
}

// Keep the row selection in sync with the checkbox values
observe('.js-plan-choice:checked', {
  add(el) {
    const row = el.closest('.plan-row')
    if (row) {
      row.classList.add('selected')
    }
  },
  remove(el) {
    const row = el.closest('.plan-row')
    if (row) {
      row.classList.remove('selected')
    }
  },
})

on('auto-check-success', '.signup-form-fields__input', async function (event) {
  const input = event.currentTarget as HTMLInputElement
  input.setAttribute('aria-invalid', 'false')
  // eslint-disable-next-line i18n-text/no-en
  announce('Input is now valid.')
})

on('auto-check-error', '.signup-form-fields__input', async function (event) {
  const input = event.currentTarget as HTMLInputElement
  input.setAttribute('aria-invalid', 'true')
})

onKey('keyup', '.signup-form-fields__input', function (event) {
  const input = event.currentTarget as HTMLInputElement
  if (input.value.length === 0) {
    input.removeAttribute('aria-invalid')
  }
})

// To animate closing of detail element
on('click', '.signups-rebrand__details', function (e) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )
  if (prefersReducedMotion.matches) {
    return
  }

  const target = e.target as HTMLElement
  const details = target.closest('details')

  if (details?.hasAttribute('open')) {
    e.preventDefault()
    details.classList.add('closing')
  }
})

on('animationend', '.signups-rebrand__details', function (e) {
  const target = e.target as HTMLElement
  const details = target.closest('details')

  if (e.animationName === 'close') {
    details?.removeAttribute('open')
    details?.classList.remove('closing')
  }
})

// Look for any blank fields and display validation errors on the fields, necessary for accessibility.
// This does not return anything, it adds/removes divs and classes to the DOM.
// The auto-check-element (https://github.com/github/auto-check-element) validates only onInput, and does not validate blank fields.
// This handles input fields as well as the button/select for choosing a country
const displayErrorsForBlankFields = (
  userFields: NodeListOf<HTMLElement>,
  validateOnBlur: boolean = false
): void => {
  for (const field of userFields) {
    if (validateOnBlur) {
      field.addEventListener('blur', () => handleFieldValidation(field))
    } else {
      handleFieldValidation(field)
    }
  }
}

const handleFieldValidation = (element: HTMLElement) => {
  if (element.tagName === 'SELECT-PANEL') {
    // Get the button element from the select panel
    const button = element.querySelector('button')

    if (button?.classList.contains('country-select-button')) {
      const inputParent = element?.closest('.signup-form-fields__validate')
      // eslint-disable-next-line i18n-text/no-en
      const errorMessage = 'Select your country to continue'
      // Check if the country is blank
      if (button?.textContent?.trim() === 'Select Country/Region') {
        // Check if the error message already exists
        if (
          inputParent?.querySelector('.nux-error')?.textContent !== errorMessage
        ) {
          handleBlankErrorDisplay(element, errorMessage)
          button.classList.add('button-error')
          button.addEventListener(
            'click',
            () => {
              inputParent?.querySelector('.nux-error')?.remove()
              button.classList.remove('button-error')
            },
            { once: true }
          )
        }
      } else {
        // Remove error message if field is no longer blank
        if (
          inputParent?.querySelector('.nux-error')?.textContent === errorMessage
        ) {
          inputParent?.querySelector('.nux-error')?.remove()
          element.classList.remove('is-autocheck-errored')
          element.classList.remove('js-nux-blank-field')
          button.classList.remove('button-error')
        }
      }
    }
  } else if (element instanceof HTMLInputElement) {
    const inputParent = element?.closest('.signup-form-fields__validate')
    const fieldName = element?.placeholder
    const errorMessage = `${fieldName} cannot be blank`

    if (element?.value?.length === 0 && element?.required) {
      // Check if the error message already exists
      if (
        inputParent?.querySelector('.nux-error')?.textContent !== errorMessage
      ) {
        handleBlankErrorDisplay(element, errorMessage)
      }
    } else {
      // Remove error message if field is no longer blank
      if (
        inputParent?.querySelector('.nux-error')?.textContent === errorMessage
      ) {
        inputParent?.querySelector('.nux-error')?.remove()
        element.classList.remove('is-autocheck-errored')
        element.classList.remove('js-nux-blank-field')
      }
    }
  }
}

const handleBlankErrorDisplay = (element: Element, errorMessage: string) => {
  element.classList.add('is-autocheck-errored')

  // Create and insert error message
  const newErrorDiv = document.createElement('div')
  newErrorDiv.classList.add('error')

  const newErrorParagraph = document.createElement('p')
  newErrorParagraph.classList.add('mb-0')
  // nux-error adds red triangle icon to the left of the error message if fields are blank
  newErrorParagraph.classList.add('nux-error')
  newErrorParagraph.textContent = errorMessage

  newErrorDiv.appendChild(newErrorParagraph)
  element?.nextElementSibling?.insertAdjacentElement('afterend', newErrorDiv)

  const id = `nux-blank-error-${(Math.random() * 10000).toFixed(0)}`
  newErrorDiv.id = id

  const ariaDescribedby = element.getAttribute('aria-describedby')
  element.classList.add('js-nux-blank-field')
  setTimeout(() => {
    element.setAttribute('aria-describedby', [id, ariaDescribedby].join(' '))
  }, 50)

  // Announce the error
  announce(errorMessage)
}

// Allows us to add sr-only class only to elements within the new signup flow and not affect other global autocheck elements
observe('.js-nux-sr-only', {
  add(el) {
    if (el.closest('#signup-form-fields-container')) {
      el.classList.add('sr-only')
    }
  },
})

// Allows us to add nux-error class only to elements within the new signup flow and not affect other global elements
observe('.js-nux-conditionally-add-error', {
  add(el) {
    if (el.closest('#signup-form-fields-container')) {
      el.classList.add('nux-error')
    }
  },
})

observe('.js-nux-conditionally-remove-margin', {
  add(el) {
    if (el.closest('#signup-form-fields-container')) {
      el.classList.add('nux-remove-margin')
    }
  },
})
