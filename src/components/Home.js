import React from 'react';
import { gql, graphql } from 'react-apollo';
import Form from './Form.js';
import CartLink from './CartLink.js';
import SizeMenu from './SizeMenu.js';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Home extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         sizeChosen : false,
         selectedSize: 'small',
         pizza: {}
      };

      this.handleSelectSize = this.handleSelectSize.bind(this);
      this.handleSubmitSize = this.handleSubmitSize.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.initialSize = this.initialSize.bind(this);
   };

   static propTypes = {
      handleAddPizza: PropTypes.func.isRequired,
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
      }).isRequired,
      data: PropTypes.shape({
         loading: PropTypes.bool.isRequired,
         pizzaSizes: PropTypes.arrayOf(PropTypes.shape({
            __typename: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            maxToppings: PropTypes.number,
            name: PropTypes.string.isRequired,
            toppings: PropTypes.arrayOf(PropTypes.shape({
               __typename: PropTypes.string.isRequired,
               defaultSelected: PropTypes.bool.isRequired,
               toppings: PropTypes.shape({
                  __typename: PropTypes.string.isRequired,
                  name: PropTypes.string.isRequired,
                  price: PropTypes.number.isRequired
               })
            }).isRequired).isRequired
         }).isRequired)
      })
   };

   handleSelectSize(event) {
      this.setState({
         selectedSize: event.target.value
      });
      let selectedPizza = this.props.data.pizzaSizes.find(pizza => {
         return pizza.name === event.target.value;
      });
      this.setState({pizza: selectedPizza});
   };

   handleSubmitSize() {
      this.setState({sizeChosen: true});
   };

   initialSize(size) {
      this.setState({pizza: size});
   };

   resetForm() {
      this.setState({
         sizeChosen: false,
      });
   };

   render() {
      if (this.props.data.loading) {
         return (
            <Row className='loading'>
               <Col xs={4} xsOffset={4}>
                  Loading...
               </Col>
            </Row>
         );
      };

      if (this.state.sizeChosen) {
         return (
            <div>
               <CartLink 
                  store={this.props.store} />
               <Form 
                  resetForm={this.resetForm} 
                  handleAddPizza={this.props.handleAddPizza} 
                  pizza={this.state.pizza} />
            </div>
         );
      };

      return (
         <div>
            <CartLink 
               store={this.props.store} />
            <SizeMenu 
               handleSelectSize={this.handleSelectSize} 
               handleSubmitSize={this.handleSubmitSize}
               initialSize={this.initialSize}
               pizzaSizes={this.props.data.pizzaSizes} 
               selectedSize={this.state.selectedSize} />
         </div>
      );
   };
};

const FeedQuery = gql`query pizzaSizes {
    pizzaSizes {
        name
        basePrice
        maxToppings
        toppings {
        defaultSelected
            topping {
                name
                price
            }
        }
    }
}`;

//allows Home component to access graphQL query results as props
const HomeWithData = graphql(FeedQuery)(Home);

export default HomeWithData;
