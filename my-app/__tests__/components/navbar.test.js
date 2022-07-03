import { render, screen } from '@testing-library/react'
import Navbar from '../../components/Navbar';
import '@testing-library/jest-dom'

describe('Navbar', () => {
  it('renders a navbar', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  }),
  it('renders a navbar with heading', () => {
    render(<Navbar />)
    expect(screen.getByText('E-COMMERCE')).toBeInTheDocument();
  }),
  it('renders a navbar with Home Button', () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument();
  }),
  it('renders a navbar with Products Button', () => {
    render(<Navbar />)
    expect(screen.getByText('Products')).toBeInTheDocument();
  })
})
