import { render, screen, fireEvent } from '@testing-library/react'
import Product from '../../pages/products/[id]';
import '@testing-library/jest-dom';

describe('Product', () => {
  it('renders first product', () => {
    render(<Product />) 
  })
})