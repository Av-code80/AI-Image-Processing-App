import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' 
import Button from './Button' 

const mockProps = {
  className: 'custom-class',
  children: 'Click me!',
  onClick: jest.fn(), 
}

describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button {...mockProps} />)
    const buttonElement = screen.getByRole('button', { name: 'Click me!' })
    expect(buttonElement).toBeInTheDocument()
  })
})
