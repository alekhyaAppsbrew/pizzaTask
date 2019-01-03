import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class CartLink extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         quantity: 0
      };
   };

   static propTypes = {
      store: PropTypes.shape({
         pizzas: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            size: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
            toppings: PropTypes.arrayOf(PropTypes.shape({
               __typename: PropTypes.string.isRequired,
               name: PropTypes.string.isRequired,
               price: PropTypes.number.isRequired
            }).isRequired).isRequired
         }).isRequired).isRequired
      })
   };

   componentWillReceiveProps(nextProps){
      if (nextProps.store.pizzas.length > 0) {
         let sum = 0;
         nextProps.store.pizzas.map((pizza) => sum += pizza.quantity);
         this.setState({
            quantity: sum
         });
      };
   };

   render() {
      return (
         <Row>

            <Col  >
               <div className="cartLink">
                  <Link to='/cart'>({this.state.quantity})Cart</Link>
               </div>
            </Col>
         </Row>
      );
   };
};
