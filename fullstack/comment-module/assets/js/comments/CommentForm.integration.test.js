/* Reminder: these forms are displayed
only if the user is connected */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CommentForm } from './CommentForm'

let $wrapper

beforeEach(() => {
  $wrapper = document.createElement('div')
})

afterEach(() => {
  $wrapper = null
})

describe('Filling the form to POST a comment', () => {
  test('should test a correctly filled form', async () => {
    render(<CommentForm comment={null} post={1} name="content" />)

    // it should display the textarea with the placeholder
    const textarea = screen.getByLabelText('Votre commentaire')
    expect(textarea.getAttribute('placeholder')).toBe(
      'Saisir le commentaire ici'
    )

    // it should display a longer than five caracters text
    fireEvent.change(textarea, {
      target: {
        value: 'Voici mon commentaire qui fait plus de 5 caractères.',
      },
    })
    expect(textarea.value).toBe(
      'Voici mon commentaire qui fait plus de 5 caractères.'
    )

    // it should disable the submit button while loading
    const submitButton = screen.getByText(/envoyer/i)
    expect(submitButton).toHaveProperty('disabled', false)
    fireEvent.click(submitButton)
    expect(submitButton).toHaveProperty('disabled', true)
  })

  test('should test an uncorrect filled form', async () => {
    render(
      <CommentForm
        comment={null}
        post={1}
        name="content"
        error={'Votre commentaire est trop court'}
      />
    )

    // it should display the textarea with the placeholder
    const textarea = screen.getByLabelText('Votre commentaire')
    expect(textarea.getAttribute('placeholder')).toBe(
      'Saisir le commentaire ici'
    )

    // it should display a shorter than five caracters text
    fireEvent.change(textarea, {
      target: {
        value: 'Test',
      },
    })
    expect(textarea.value).toBe('Test')

    // it should disable the submit button while loading
    const submitButton = screen.getByText(/envoyer/i)
    expect(submitButton).toHaveProperty('disabled', false)
    fireEvent.click(submitButton)
    expect(submitButton).toHaveProperty('disabled', true)
  })
})

describe('Filling the form to UPDATE a comment', () => {
  test('should render the UPDATE comment form without crashing', () => {
    const mockedComment = {
      '@id': '/api/comments/1',
      '@type': 'Comment',
      id: 1,
      content: 'Voici mon commentaire à modifier',
      publishedAt: '2022-05-09T05:00:38+00:00',
      author: {
        '@id': '_:9999',
        '@type': 'User',
        id: 9,
        username: 'test_user',
      },
    }

    render(<CommentForm comment={mockedComment} name="contentToModify" />)

    const textarea = screen.getByLabelText('Votre commentaire')

    // it should display the comment text in the teaxtarea field
    expect(textarea.value).toBe(mockedComment.content)

    // it should display the being modified comment in the teaxtarea field
    fireEvent.change(textarea, {
      target: { value: 'Voici mon commentaire modifié' },
    })
    expect(textarea.value).toBe('Voici mon commentaire modifié')

    // it should disable the submit button while loading
    const submitButton = screen.getByText(/editer/i)
    expect(submitButton).toHaveProperty('disabled', false)
    fireEvent.click(submitButton)
    expect(submitButton).toHaveProperty('disabled', true)
  })
})
