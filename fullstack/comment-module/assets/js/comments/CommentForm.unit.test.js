/* Reminder: these forms are displayed 
only if the user is connected */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { CommentForm } from './CommentForm'

let $wrapper

beforeEach(() => {
  $wrapper = document.createElement('div')
})

afterEach(() => {
  $wrapper = null
})

describe('POST comment form displayed above the comments', () => {
  test('should render the POST comment form without crashing', () => {
    render(<CommentForm comment={null} name="content" />)

    const legend = screen.getByText(/laisser un commentaire/i)
    const legendIcon = screen.getByTestId('fa fa-comment')
    const textarea = screen.getByLabelText('Votre commentaire')
    const form = textarea.parentElement.parentElement.parentElement
    const submitButton = screen.getByText(/envoyer/i)

    // it should have the POST method
    expect(form.getAttribute('method')).toMatch(/POST/i)
    expect(form.getAttribute('method')).not.toMatch(/PUT/i)

    // it should display the "Laisser un commentaire" legend
    expect(legend).toBeTruthy()
    expect(legendIcon).toBeTruthy()

    // it should have attributes
    expect(textarea.getAttribute('name')).toBe('content')
    expect(textarea.id).toBe('content')
    expect(textarea.getAttribute('placeholder')).toBe(
      'Saisir le commentaire ici'
    )

    // it should have help text / it shouldn't have error text at first loading
    const helpText = textarea.nextElementSibling
    expect(helpText.getAttribute('class')).toBe('help-bloc')
    expect(helpText.textContent).toBe(
      'Les commentaires non conformes à notre code de conduite seront modérés.'
    )

    // it should display a submit button which text is 'Envoyer'
    expect(submitButton).toBeTruthy()
    // it should not display a 'Cancel' button
    expect(submitButton.previousElementSibling).not.toBeTruthy()
    expect(submitButton.firstElementChild.getAttribute('class')).toBe(
      'fa fa-paper-plane'
    )
  })
})

describe('UPDATE Comment form displayed in the comment', () => {
  test('should render the UPDATE comment form without crashing', () => {
    render(<CommentForm comment={!null} onCancel={!null} name="content" />)

    const textarea = screen.getByLabelText('Votre commentaire')
    const legend = textarea.parentElement.previousElementSibling
    const form = textarea.parentElement.parentElement.parentElement
    const submitButton = screen.getByText(/editer/i)
    const cancelButton = screen.getByText(/annuler/i)
    const submitButtonIcon =
      submitButton.firstElementChild.getAttribute('class')

    // it should have the UPDATE method
    expect(form.getAttribute('method')).toMatch(/PUT/i)
    expect(form.getAttribute('method')).not.toMatch(/POST/i)

    // it should not display the "Laisser un commentaire" legend
    expect(legend).not.toBeTruthy()

    // it should have attributes
    expect(textarea.getAttribute('name')).toBe('content')
    expect(textarea.id).toBe('content')
    expect(textarea.getAttribute('placeholder')).toBe(
      'Saisir le commentaire ici'
    )

    // it should have help text / it shouldn't have error text at first loading
    const helpText = textarea.nextElementSibling
    expect(helpText.getAttribute('class')).toBe('help-bloc')
    expect(helpText.textContent).toBe(
      'Les commentaires non conformes à notre code de conduite seront modérés.'
    )

    // it should display a submit button and a Cancel button
    expect(submitButton).toBeTruthy()
    expect(submitButtonIcon).toBe('fa fa-paper-plane')
    expect(cancelButton).toBeTruthy()
  })
})
