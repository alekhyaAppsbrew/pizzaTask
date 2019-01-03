import React from 'react';
import CartLink from '../components/CartLink';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('CartLink Component', () => {
   it('renders without crashing', () => {
      let quantity = 4;

      const tree = renderer.create(
         <MemoryRouter> 
            <CartLink 
               quantity={4}
            />
         </MemoryRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
   });
});
