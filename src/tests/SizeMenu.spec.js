import React from 'react';
import SizeMenu from '../components/SizeMenu';
import renderer from 'react-test-renderer';

describe('SizeMenu Component', () => {

   let pizzaSizes = [{name: 'small'}, {name: 'medium'}, {name: 'large'}];

   it('renders without crashing', () => {
      const tree = renderer.create(
         <SizeMenu 
            pizzaSizes={pizzaSizes}
            initialSize={() => {}}/>
      ).toJSON();
      expect(tree).toMatchSnapshot();
   });

   it('handles size selection correctly', () => {
   });
});
