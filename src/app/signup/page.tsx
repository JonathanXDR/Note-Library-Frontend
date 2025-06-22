export default function SignUp() {
  return (
    <div id="signup-form-fields-container">
      <div id="email-container" className="js-octocaptcha-hide">
        <label for="email" className="text-semibold">
          Email<sup aria-hidden="true">*</sup>
        </label>
        <div className="mb-3 mt-1">
          <auto-check
            src="/email_validity_checks"
            required=""
            dirty=""
            className="signup-form-fields__validate"
          >
            <input
              id="email"
              className="width-full js-auto-check-input js-nux-input signup-form-fields__input"
              required=""
              placeholder="Email"
              autocomplete="off"
              dir="auto"
              aria-describedby="email-err"
              type="email"
              name="user[email]"
              spellcheck="false"
              style='background-image: url("data:image/png;base64,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") !important; background-repeat: no-repeat; background-size: 20px; background-position: 97% center; cursor: auto;'
            />
            <input
              type="hidden"
              value="oG4SZiAMpMZII3xDvEF5nmgv+xcHroLYzm6tA2rgcFHnxtdWq4s44vXrP8ajVk4bYXNB0OcxhuTQfOQRrkZ7iQ=="
            />
          </auto-check>
        </div>
      </div>

      <div id="password-container" className="js-octocaptcha-hide">
        <label for="password" className="text-semibold">
          Password<sup aria-hidden="true">*</sup>
        </label>
        <div className="mb-3 mt-1">
          <div>
            <visible-password>
              <auto-check
                src="https://github.com/password_validity_checks?hide_password_validity_pills=true&amp;hide_strength_sentence=true"
                required=""
                className="signup-form-fields__validate successed"
              >
                <input
                  id="password"
                  placeholder="Password"
                  className="form-control width-full js-auto-check-input js-nux-input signup-form-fields__input is-autocheck-successful"
                  required=""
                  passwordrules="minlength: 15; allowed: unicode;"
                  autocapitalize="off"
                  autocomplete="off"
                  autocorrect="off"
                  dir="auto"
                  type="password"
                  name="user[password]"
                  spellcheck="false"
                  aria-describedby=" password-helper"
                  aria-invalid="false"
                />
                <input
                  type="hidden"
                  value="DDv3udQcjiaj1KH8ZYXi1Ct0Ti8yKNNTEwqJ8qAXfRp/rDp9K1X06zRpMGC+45EzF878DpEoofbGIPeu1g2Uqw=="
                />
                <div
                  id="input-check-5910"
                  className="success js-nux-sr-only sr-only"
                  hidden=""
                >
                  <p className="password-validity-summary password-validity-summary-success my-2 js-nux-sr-only sr-only">
                    Password is strong
                  </p>
                </div>
              </auto-check>
            </visible-password>
          </div>
          <div
            id="password-helper"
            className="text-small mt-1 signup-form-fields__helper-text"
          >
            Password should be at least 15 characters OR at least 8 characters
            including a number and a lowercase letter.
          </div>
        </div>
      </div>

      <div id="username-container" className="js-octocaptcha-hide">
        <div>
          <label for="login" className="text-semibold">
            Username<sup aria-hidden="true">*</sup>
          </label>
        </div>
        <div className="mb-3 mt-1">
          <div>
            <auto-check
              src="/signup_check/username?suggest_usernames=true"
              http-method="GET"
              className="width-full mr-2 signup-form-fields__validate errored"
              required=""
              validate-on-keystroke=""
            >
              <input
                id="login"
                className="form-control width-full js-auto-check-input js-nux-input signup-form-fields__input is-autocheck-errored"
                required=""
                placeholder="Username"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                dir="auto"
                type="text"
                name="user[login]"
                spellcheck="false"
                aria-describedby=" username-helper"
                aria-invalid="true"
              />
              <div></div>
              <div id="input-check-5237" className="error">
                <div className="m-1 js-nux-conditionally-remove-margin nux-remove-margin">
                  <div className="mb-1 js-nux-conditionally-add-error nux-error">
                    Username may only contain alphanumeric characters or single
                    hyphens, and cannot begin or end with a hyphen.
                  </div>
                </div>
              </div>
            </auto-check>
          </div>
          <div
            id="username-helper"
            className="text-small mt-1 signup-form-fields__helper-text"
          >
            Username may only contain alphanumeric characters or single hyphens,
            and cannot begin or end with a hyphen.
          </div>
        </div>
      </div>
      <signups-marketing-consent-fields className="js-octocaptcha-hide">
        <div id="country-dropdown-container">
          <div>
            <label
              for="country-dropdown"
              className="text-semibold"
              id="country-dropdown-label"
            >
              Your Country/Region<sup aria-hidden="true">*</sup>
              <span className="sr-only">, required</span>
            </label>
          </div>
          <div className="mt-1 mb-3 select-panel-wrapper signup-form-fields__validate">
            <select-panel
              aria-describedby="country-helper"
              id="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda"
              anchor-align="start"
              anchor-side="outside-bottom"
              className="signup-form-fields__select"
            >
              <dialog-helper>
                <button
                  id="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-button"
                  aria-labelledby="country-dropdown-label"
                  aria-controls="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-dialog"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  type="button"
                  className="country-select-button Button--secondary Button--large Button Button--fullWidth color-bg-default text-normal"
                >
                  {" "}
                  <span className="Button-content Button-content--alignStart">
                    <span className="Button-label">
                      <span className="color-fg-muted"> </span>
                      <span>Switzerland</span>
                    </span>
                  </span>
                  <span className="Button-visual Button-trailingAction">
                    <svg
                      aria-hidden="true"
                      height="16"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      className="octicon octicon-chevron-down"
                    >
                      <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                    </svg>
                  </span>
                </button>
                <dialog
                  id="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-dialog"
                  aria-labelledby="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-dialog-title"
                  style="position: absolute;"
                  className="Overlay Overlay-whenNarrow Overlay--size-small-portrait"
                >
                  <div className="Overlay-header Overlay-header--divided">
                    <div className="Overlay-headerContentWrap">
                      <div className="Overlay-titleWrap">
                        <h1
                          className="Overlay-title "
                          id="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-dialog-title"
                        >
                          Select Country/Region
                        </h1>
                      </div>
                      <div className="Overlay-actionWrap">
                        <button
                          aria-label="Close"
                          type="button"
                          className="close-button Overlay-closeButton"
                        >
                          <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            className="octicon octicon-x"
                          >
                            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="Overlay-headerFilter">
                      {" "}
                      <div hidden="">
                        <x-banner>
                          <div className="Banner flash Banner--error flash-error mb-2">
                            <div className="Banner-visual">
                              <svg
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                className="octicon octicon-stop"
                              >
                                <path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
                              </svg>
                            </div>
                            <div className="Banner-message">
                              <p className="Banner-title"></p>
                              <h2 className="f6 text-normal">
                                Sorry, something went wrong.
                              </h2>
                              <p></p>
                            </div>
                          </div>
                        </x-banner>{" "}
                      </div>
                      <remote-input aria-owns="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-body">
                        <primer-text-field className="FormControl width-full FormControl--fullWidth">
                          <label
                            for="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-filter"
                            className="sr-only FormControl-label position-absolute sr-only FormControl-label"
                          >
                            Filter
                          </label>
                          <div className="FormControl-input-wrap FormControl-input-wrap--leadingVisual">
                            <span className="FormControl-input-leadingVisualWrap">
                              <svg
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                className="octicon octicon-search FormControl-input-leadingVisual"
                              >
                                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
                              </svg>
                              <span hidden="hidden">
                                <svg
                                  style="box-sizing: content-box; color: var(--color-icon-primary);"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  aria-hidden="true"
                                  className="anim-rotate"
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="7"
                                    stroke="currentColor"
                                    stroke-opacity="0.25"
                                    stroke-width="2"
                                    vector-effect="non-scaling-stroke"
                                    fill="none"
                                  ></circle>
                                  <path
                                    d="M15 8a7.002 7.002 0 00-7-7"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    vector-effect="non-scaling-stroke"
                                  ></path>
                                </svg>{" "}
                                <span className="sr-only">Loading</span>
                              </span>
                            </span>

                            <input
                              id="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-filter"
                              type="search"
                              autofocus="autofocus"
                              aria-describedby="validation-929d388e-fa91-46c4-ad4a-609cf5ef91c6"
                              className="form-control FormControl-input FormControl-medium"
                              name="filter"
                              autocomplete="off"
                              spellcheck="false"
                            />
                          </div>
                          <div
                            className="FormControl-inlineValidation"
                            id="validation-929d388e-fa91-46c4-ad4a-609cf5ef91c6"
                            hidden="hidden"
                          >
                            <span
                              className="FormControl-inlineValidation--visual"
                              hidden=""
                            >
                              <svg
                                aria-hidden="true"
                                height="12"
                                viewBox="0 0 12 12"
                                version="1.1"
                                width="12"
                                className="octicon octicon-check-circle-fill"
                              >
                                <path d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm-.705 8.737L9.63 4.403 8.392 3.166 5.295 6.263l-1.7-1.702L2.356 5.8l2.938 2.938Z"></path>
                              </svg>
                            </span>
                            <span className=" FormControl-inlineValidation--visual">
                              <svg
                                aria-hidden="true"
                                height="12"
                                viewBox="0 0 12 12"
                                version="1.1"
                                width="12"
                                className="octicon octicon-alert-fill"
                              >
                                <path d="M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 0 1-1.146 1.954H1.33A1.313 1.313 0 0 1 .183 9.058ZM7 7V3H5v4Zm-1 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                              </svg>
                            </span>
                            <span></span>
                          </div>
                        </primer-text-field>
                      </remote-input>
                    </div>
                  </div>{" "}
                  <div>
                    <focus-group direction="vertical" mnemonics="" retain="">
                      <live-region></live-region>
                      <div>
                        <div id="select-panel-2c2d644e-051e-412a-9e1c-2eb37c428cda-body"></div>
                        <div className="SelectPanel-emptyPanel" hidden="">
                          <h2 className="v-align-middle m-3 f5">
                            No results found
                          </h2>
                        </div>
                      </div>{" "}
                    </focus-group>
                  </div>
                </dialog>{" "}
              </dialog-helper>
            </select-panel>{" "}
            <div></div>
            <div
              id="country-helper"
              className="text-small mt-1 signup-form-fields__helper-text"
            >
              For compliance reasons, we're required to collect country
              information to send you occasional updates and announcements.
            </div>
          </div>
        </div>
        <div>
          <fieldset>
            <legend className="text-semibold"> Email preferences </legend>
            <div className="mt-1 mb-3">
              <div className="FormControl-checkbox-wrap">
                <input
                  name="user_signup[marketing_consent]"
                  type="hidden"
                  value="0"
                  autocomplete="off"
                />
                <input
                  className="FormControl-checkbox"
                  type="checkbox"
                  value="1"
                  name="user_signup[marketing_consent]"
                  id="user_signup[marketing_consent]"
                />
                <span className="FormControl-checkbox-labelWrap">
                  <label
                    className="text-normal FormControl-label"
                    for="user_signup[marketing_consent]"
                  >
                    Receive occasional product updates and announcements
                  </label>
                </span>
              </div>
            </div>
          </fieldset>
        </div>
      </signups-marketing-consent-fields>
    </div>
  );
}
