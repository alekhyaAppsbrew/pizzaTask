import React from 'react';
import Cart from '../components/Cart';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('Cart Component', () => {
   it('renders without crashing', () => {
      let store = {
         pizzas: []
      };

      const tree = renderer.create(
         <MemoryRouter> 
            <Cart 
               store={store}
               handleRemovePizza={() => {}}
            />
         </MemoryRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
   });
});
