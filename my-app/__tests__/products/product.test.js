import { render, screen, fireEvent } from '@testing-library/react'
import Product from '../../pages/products/[id]';
import '@testing-library/jest-dom';

import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

describe('Product', () => {
  it('renders first product', () => {
    render(<Product />) 
  })
})

mockRouter.useParser(createDynamicRouteParser([
  "products/[id]",
]));

it('should parse dynamic route for first product', () => {
  mockRouter.push('/products/1');
  expect(mockRouter).toMatchObject({
    pathname: '/products/[id]',
    query: { id: '1' }
  });
})