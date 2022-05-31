import React from 'react'

const className = (...arr) => arr.filter(Boolean).join(' ')

export const Field = React.forwardRef(
  (
    { help, name, children, error, onChange, required, minLength, placeholder },
    ref
  ) => {
    if (error) {
      help = error
    }

    return (
      <div className={className('form-group', error && 'has-error')}>
        <label htmlFor={name} className="control-label">
          {children}
          {/* Reminder: elements written in the Field Component when inserted in the template*/}
        </label>
        <textarea
          ref={ref}
          name={name}
          id={name}
          // cols="30"
          rows="10"
          className="form-control"
          onChange={onChange}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
        />
        {help && (
          <div className={className(error ? 'has-error' : 'help-bloc')}>
            {help}
          </div>
        )}
      </div>
    )
  }
)
