import React from 'react';
import Form from '../components/Form';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('Form Component', () => {
   it('renders without crashing', () => {
      let pizza = {
         __typename: 'pizzaSize',
         basePrice: 9.89,
         maxToppings: 3,
         name: 'small',
         toppings: [
            {
               __typename: 'pizzaToppingConnection',
               defaultSelected: false,
               topping: {
                  __typename: 'topping',
                  name: 'pepperoni',
                  price: 0.4
               }
            }
         ]
      };

      const tree = renderer.create(
         <MemoryRouter> 
            <Form 
               pizza={pizza}
               handleRemovePizza={() => {}}
               handleAddPizza={() => {}}
            />
         </MemoryRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
      setTimeout(() => done());
   })
})
