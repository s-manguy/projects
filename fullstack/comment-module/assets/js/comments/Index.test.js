import React from 'react'
import { render, screen } from '@testing-library/react'
import { Title, Comments, ConnectBlock } from './Index'

let $wrapper

beforeEach(() => {
  $wrapper = document.createElement('div')
})

afterEach(() => {
  $wrapper = null
})

describe('Title component', () => {
  test('should render Title without crashing', () => {
    render(<Title />)
  })

  test('should display the number of comments', () => {
    render(<Title count={147} />)

    const title = screen.getByText('Commentaire', { exact: false })
    const expectedCount = '147'
    expect(title.textContent).toContain(expectedCount)
  })

  test('should write Commentaire without final s', () => {
    render(<Title count={1} />)

    const title = screen.getByText('Commentaire', { exact: false })
    const withoutS = '1 Commentaire'
    expect(title.textContent).toBe(withoutS)
  })

  test('should write Commentaire with final s', () => {
    render(<Title count={5} />)

    const title = screen.getByText('Commentaire', { exact: false })
    const withS = '5 Commentaires'
    expect(title.textContent).toBe(withS)
  })
})

describe('ConnectBlock component', () => {
  test('should render without crashing', () => {
    render(<ConnectBlock />)
  })

  test('should guide to the login page', () => {
    render(<ConnectBlock />)
    const loginUrl = 'http://localhost:8000/fr/login'
    const loginPage = screen.getByText('Se connecter', {
      exact: false,
    }).href
    expect(loginPage).toEqual(loginUrl)
  })
})

describe('Comments display', () => {
  test('should render Comments without crashing', () => {
    render(<Comments />)
  })

  test('should render Comments without crashing when User is not connected', () => {
    render(<Comments user={null} post={1} />)

    screen.debug()
  })

  test('should render Comments without crashing when User is connected', () => {
    render(<Comments user={!null} post={1} />)

    screen.debug()
  })
})
