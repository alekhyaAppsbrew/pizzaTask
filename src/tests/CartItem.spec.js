import React from 'react';
import CartItem from '../components/CartItem';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('Cart Component', () => {
   it('renders without crashing', () => {
      let pizza = {
         id: 1,
         size: 'small',
         basePrice: 9.00,
         toppings: []
      };

      const tree = renderer.create(
         <MemoryRouter> 
            <CartItem 
               pizza={pizza}
               removePizza={() => {}}
               handleUpdatePizza={() => {}}
            />
         </MemoryRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
   });
});
