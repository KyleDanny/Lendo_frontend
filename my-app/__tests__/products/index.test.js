import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';

import Products from '../../pages/products';
import Product from '../../pages/products/[id]';

// 
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

describe('Products', () => {
  it('renders 10 products', () => {
    render(<Products />)
    expect(screen.getAllByRole('listitem')).toHaveLength(10);
  }), 

  it("renders result if clicking see more", () => {
    render(<Products />)
    const firstProduct = screen.getByText("Philips hue bulb");
    expect(firstProduct).toBeInTheDocument();

    const buttonSeeMore = screen.getAllByRole("see_more");
    fireEvent.click(buttonSeeMore[0]);
    // const buttonAddToCart = screen.getAllByRole("add_to_cart")[0];
  })

})