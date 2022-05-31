import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Comment } from './Comment'

let $wrapper

beforeEach(() => {
  $wrapper = document.createElement('div')
})

afterEach(() => {
  $wrapper = null
})

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

describe('User is connected and is the author of the comment', () => {
  test('should disable the Supprimer button when clicking on it', () => {
    render(<Comment comment={mockedComment} canEdit />)

    const deleteButton = screen.getByText('Supprimer')
    expect(deleteButton).toHaveProperty('disabled', false)
    fireEvent.click(deleteButton)
    expect(deleteButton).toHaveProperty('disabled', true)
  })
})
