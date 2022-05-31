import React from 'react'
import { render, screen } from '@testing-library/react'
import Icon from './Icon'

/**
 * @jest-environment jsdom
 */
describe('Icon component', () => {
  test('Should render Icon component without crashing', () => {
    render(<Icon />)

    // screen.debug()
  })

  test('Should render trash Icon', () => {
    render(<Icon icon="trash" />)

    const trashIcon = screen.getByTestId('fa fa-trash')
    expect(trashIcon.getAttribute('class')).toBe('fa fa-trash')
  })

  test('Should render undefined Icon', () => {
    render(<Icon />)

    const trashIcon = screen.getByTestId('fa fa-undefined')
    expect(trashIcon.getAttribute('class')).toBe('fa fa-undefined')
  })
})
