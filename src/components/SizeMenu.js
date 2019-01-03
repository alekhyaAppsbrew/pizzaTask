import React from 'react';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class SizeMenu extends React.Component {

   constructor(props) {
      super(props);

      this.initializeMenu = this.initializeMenu.bind(this);
   };

   static propTypes = {
      handleSelectSize: PropTypes.func,
      handleSubmitSize: PropTypes.func,
      initialSize: PropTypes.func,
      pizzaSizes: PropTypes.arrayOf(PropTypes.shape({
         __typename: PropTypes.string,
         basePrice: PropTypes.number,
         maxToppings: PropTypes.number,
         name: PropTypes.string,
         toppings: PropTypes.arrayOf(PropTypes.shape({
            __typename: PropTypes.string,
            defaultSelected: PropTypes.bool,
            topping: PropTypes.shape({
               __typename: PropTypes.string,
               name: PropTypes.string,
               price: PropTypes.number
            })
         }))
      }))
   };

   initializeMenu(){
      let pizza = this.props.pizzaSizes.find(pizza => {
         return pizza.name === this.props.selectedSize
      });
      this.props.initialSize(pizza);
   };

   componentDidMount() {
      this.initializeMenu();
   };

   render() {
      return (
         <div className="sizeSelection">
         <Grid fluid>
            <Row className="show-grid">
               <Col md={7}>
               </Col>
               <Col md={4} className="sizeSelection1stColumn">
                  <h2>CHOOSE A SIZE</h2>
                  <select
                     onChange={this.props.handleSelectSize}
                     value={this.props.selectedSize}>

                     {this.props.pizzaSizes.map(size => {
                        return <option
                           key={size.name}
                           value={size.name}>
                           {size.name.toUpperCase()}
                        </option>
                     })}
                  </select>
                  <br />
                  <Button bsStyle="success"
                          onClick={this.props.handleSubmitSize}
                          className="continueButton"
                  >
                    Continue
                  </Button>
               </Col>
               <Col md={1}>
               </Col>
            </Row>
            </Grid>
         </div>
      );
   };
};
