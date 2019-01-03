import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap';
import CartItemContainer from '../containers/CartItemContainer';
import PropTypes from 'prop-types';

export default class Cart extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         total: 0
      };

      this.calculateTotal = this.calculateTotal.bind(this);
      this.removePizza = this.removePizza.bind(this);
   };

   static propTypes = {
      handleRemovePizza: PropTypes.func.isRequired,
      store: PropTypes.shape({
         pizzas: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            size: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            basePrice: PropTypes.number.isRequired,
            toppings: PropTypes.arrayOf(PropTypes.shape({
               __typename: PropTypes.string.isRequired,
               name: PropTypes.string.isRequired,
               price: PropTypes.number.isRequired
            }).isRequired).isRequired
         }).isRequired).isRequired
      }).isRequired
   };

   async removePizza(pizza) {
      await this.props.handleRemovePizza(pizza);
      this.calculateTotal();
   };

   calculateTotal(){
      let sum = 0;
      this.props.store.pizzas.forEach(pizza => {
         sum += pizza.quantity * pizza.basePrice;
         this.setState({total: sum});
      });
   };

   componentDidMount() {
      this.calculateTotal();
   };

   componentWillReceiveProps() {
      this.calculateTotal();
   };

   render() {
      if (this.props.store.pizzas.length === 0) {
         return(
            <div>
               <Row>
                  <h1>Your cart is empty</h1>
               </Row>
               <Row>
                  <Link className="cart" to='/'>
                     <span
                        className="button">
                        Add pizzas
                     </span>
                  </Link>
               </Row>
            </div>
         )
      };

      return(
         <div>
            <Row>
               <Col xs={4} xsOffset={8}>
                  <div className="cartLink">
                     <Link to='/'>Go back</Link>
                  </div>
               </Col>
            </Row>

            <Row>
               <h1>Your Cart</h1>
            </Row>

            <Row>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Sizes</th>
                    <th>Toppings</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.store.pizzas.map((pizza, index) => {
                     return(
                        <CartItemContainer
                           key={pizza.id}
                           removePizza={this.removePizza}
                           pizza={pizza} />
                     )
                  })}
                </tbody>
              </Table>
            </Row>
            <Row>
               <Col xs={4} xsOffset={1}>
                  <h4>Order Total: ${this.state.total.toFixed(2)}</h4>
               </Col>
            </Row>
         </div>
      );
   };
};
