import React from 'react'
import { render, screen } from '@testing-library/react'
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

describe('Comment component', () => {
  test('should render Comment without crashing', () => {
    render(<Comment comment={mockedComment} canEdit={false} />)

    // it should display the comment information : author, "commenté le", date
    const author = screen.getByText('test_user')
    expect(author).toBeTruthy()
    expect(screen.getByText(/commenté le/i)).toBeTruthy()
    expect(screen.getByText('2022 M05 9 07:00')).toBeTruthy() // date modified manually

    // it should display the text comment
    const commentText = screen.getByText('Voici mon commentaire à modifier')
    expect(commentText).toBeTruthy()

    // it should not display the Supprimer and Editer buttons
    expect(commentText.nextElementSiblings).not.toBeTruthy()
  })
})

describe('Display one comment when user is not connected', () => {
  test('should render the comment when user is the author', () => {
    render(<Comment comment={mockedComment} canEdit={true} />)

    // it should display the comment information : author, "commenté le", date
    const author = screen.getByText('test_user')
    expect(author).toBeTruthy()
    expect(screen.getByText(/commenté le/i)).toBeTruthy()
    expect(screen.getByText('2022 M05 9 07:00')).toBeTruthy() // date modified manually

    // it should display the text comment
    const commentText = screen.getByText('Voici mon commentaire à modifier')
    expect(commentText).toBeTruthy()

    // it should not display the Supprimer and Editer buttons
    expect(commentText.nextElementSiblings).not.toBeTruthy()
  })
  test('should render the comment when user is NOT the author', () => {
    render(<Comment comment={mockedComment} canEdit={false} />)

    // it should display the comment information : author, "commenté le", date
    const author = screen.getByText('test_user')
    expect(author).toBeTruthy()
    expect(screen.getByText(/commenté le/i)).toBeTruthy()
    expect(screen.getByText('2022 M05 9 07:00')).toBeTruthy() // date modified manually

    // it should display the text comment
    const commentText = screen.getByText('Voici mon commentaire à modifier')
    expect(commentText).toBeTruthy()

    // it should not display the Supprimer and Editer buttons
    expect(commentText.nextElementSiblings).not.toBeTruthy()
  })
})

describe('Display one comment when user is connected', () => {
  test('should render Comment when user is not the author', () => {
    render(<Comment comment={mockedComment} canEdit={false} />)

    // it should display the comment information : author, "commenté le", date
    const author = screen.getByText('test_user')
    expect(author).toBeTruthy()
    expect(screen.getByText(/commenté le/i)).toBeTruthy()
    expect(screen.getByText('2022 M05 9 07:00')).toBeTruthy() // date modified manually

    // it should display the text comment
    const commentText = screen.getByText('Voici mon commentaire à modifier')
    expect(commentText).toBeTruthy()

    // it should not display the Supprimer and Editer buttons
    expect(commentText.nextElementSiblings).not.toBeTruthy()
  })

  test('should render Comment when user is the author', () => {
    render(<Comment comment={mockedComment} canEdit />)

    // it should display the comment information : author, "commenté le", date
    const author = screen.getByText('test_user')
    expect(author).toBeTruthy()
    expect(screen.getByText(/commenté le/i)).toBeTruthy()
    expect(screen.getByText('2022 M05 9 07:00')).toBeTruthy() // date modified manually

    // it should display the text comment
    const commentText = screen.getByText('Voici mon commentaire à modifier')
    expect(commentText).toBeTruthy()

    // it should display the Supprimer and Editer buttons
    const deleteButton = screen.getByText('Supprimer')
    expect(deleteButton).toBeTruthy()
    const deleteButtonIcon = deleteButton.firstElementChild
    expect(deleteButtonIcon.getAttribute('class')).toBe('fa fa-trash')
    const updateButton = screen.getByText('Editer')
    expect(updateButton).toBeTruthy()
    const updateButtonIcon = updateButton.firstElementChild
    expect(updateButtonIcon.getAttribute('class')).toBe('fa fa-pen')
  })
})
