import React from 'react'
import { render, screen } from '@testing-library/react'
import { Field } from './Form'

let $wrapper

beforeEach(() => {
  $wrapper = document.createElement('div')
})

afterEach(() => {
  $wrapper = null
})

describe('Form field component', () => {
  test('should render without crashing', () => {
    render(<Field />)

    // screen.debug()
  })

  test('the Field inner HTML tags at first loading', () => {
    render(
      <Field
        name="testContent"
        help="Texte d'aide"
        required
        minLength={5}
        placeholder="Ecrivez votre commentaire ici."
      >
        Test
      </Field>
    )

    const textarea = screen.getByLabelText('Test', {
      exact: false,
    })
    // it tests the label for attribute
    expect(textarea.previousElementSibling.getAttribute('for')).toBe(
      'testContent'
    )
    // it tests the textarea attributes
    expect(textarea.getAttribute('name')).toBe('testContent')
    expect(textarea.getAttribute('id')).toBe('testContent')
    expect(textarea.hasAttribute('required')).toBeTruthy()
    expect(textarea.getAttribute('minLength')).toBe('5')
    expect(textarea.hasAttribute('placeholder')).toBeTruthy()
    // it tests the help display
    expect(textarea.nextElementSibling.getAttribute('class')).toBe('help-bloc')
    expect(textarea.nextElementSibling.getAttribute('class')).not.toContain(
      'has-error'
    )
  })

  test('when error is received from server-side validation', async () => {
    render(
      <Field
        error="Votre texte est trop court"
        name="testContent"
        help="Texte d'aide"
        required
        minLength={5}
      >
        Test
      </Field>
    )

    // screen.debug()

    const textarea = screen.getByLabelText('Test', {
      exact: false,
    })

    /* the two tests below are useful on server-side validation */
    // it tests the div class attribute has toggled from help to error
    expect(textarea.parentElement.getAttribute('class')).toContain('has-error')
    expect(textarea.nextElementSibling.getAttribute('class')).toBe('has-error')
    expect(textarea.nextElementSibling.getAttribute('class')).not.toContain(
      'help-bloc'
    )
    // it tests the div contains has toggled from help message to error message
    expect(textarea.nextElementSibling.textContent).toBe(
      'Votre texte est trop court'
    )
    expect(textarea.nextElementSibling.textContent).not.toBe("Texte d'aide")
    /* the two tests above are useful on server-side validation */
  })
})
