import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';

let quantityNums = [];

for (let i = 1; i < 11; i++) {
   quantityNums.push(i);
}

export default class Form extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         submitted: false,
         pickedToppings: [],
         toppingsMax: false ,
         quantity: 1,
         maxNumberOfToppings: 0,
         total: 0,
         grandTotal: 0
      };

      this.addTopping = this.addTopping.bind(this);
      this.removeTopping = this.removeTopping.bind(this);
      this.handleToppingChange = this.handleToppingChange.bind(this);
      this.updateTotal = this.updateTotal.bind(this);
      this.handleAddToCart = this.handleAddToCart.bind(this);
      this.selectQuantity = this.selectQuantity.bind(this);
      this.checkMaxToppings = this.checkMaxToppings.bind(this);
      this.initializeForm = this.initializeForm.bind(this);
   };

   static proptypes = {
      handleAddPizza: PropTypes.func.isRequired,
      pizza: PropTypes.shape({
         __typename: PropTypes.string.isRequired,
         basePrice: PropTypes.number.isRequired,
         maxToppings: PropTypes.number,
         name: PropTypes.string.isRequired,
         toppings: PropTypes.arrayOf(PropTypes.shape({
            __typename: PropTypes.string.isRequired,
            defaultSelected: PropTypes.bool.isRequired,
            topping: PropTypes.shape({
               __typename: PropTypes.string.isRequired,
               name: PropTypes.string.isRequired,
               price: PropTypes.number.isRequired
            }).isRequired
         }).isRequired).isRequired
      }).isRequired
   };

   handleAddToCart() {
      let pizza = {};
      pizza.size = this.props.pizza.name;
      pizza.toppings = this.state.pickedToppings;
      pizza.basePrice = this.state.total;
      pizza.quantity = this.state.quantity;

      this.props.handleAddPizza(pizza);
      this.setState({submitted: true});
   };

   handleToppingChange(topping) {
      this.state.pickedToppings.includes(topping) ? this.removeTopping(topping) : this.addTopping(topping);
   };

   updateTotal(change, amount) {
      if (change === 'add') {
         let toppingPrice = Number(amount);
         let beginTotal = Number(this.state.total);
         let newTotal = (beginTotal + toppingPrice);
         this.setState({
            total: newTotal,
            grandTotal: newTotal * this.state.quantity
         });
      }
      else if (change === 'subtract') {
         let toppingPrice = Number(amount);
         let beginTotal = Number(this.state.total);
         let newTotal = (beginTotal - toppingPrice);
         this.setState({
            total: newTotal,
            grandTotal: newTotal * this.state.quantity
         });
      };
   };

   selectQuantity(event) {
      this.setState({
         quantity: Number(event.target.value),
         grandTotal: this.state.total * event.target.value
      });
   };

   checkMaxToppings(toppings, max) {
      if (toppings.length === max) {
         this.setState({toppingsMax: true});
      };
      if (toppings.length < max) {
         this.setState({toppingsMax: false});
      };
   };

   addTopping(topping) {
      let newToppings = this.state.pickedToppings.concat(topping);
      this.setState({pickedToppings: newToppings});
      this.updateTotal('add', topping.price);
      this.checkMaxToppings(newToppings, this.props.pizza.maxToppings);
   };

   removeTopping(topping) {
      let newToppings = this.state.pickedToppings.filter(each => {
         return each !== topping;
      });
      this.setState({pickedToppings: newToppings});
      this.updateTotal('subtract', topping.price);
      this.checkMaxToppings(newToppings, this.props.pizza.maxToppings);
   };

   initializeForm() {
      let defaultToppings = [];
      let sum = this.props.pizza.basePrice;
      this.props.pizza.toppings.forEach(topping => {
         if (topping.defaultSelected) {
            defaultToppings.push(topping.topping);
            sum += topping.topping.price;
         };
         this.addTopping(defaultToppings);
      });
      this.setState({
         total: sum,
         grandTotal: sum
      });
      if (this.props.pizza.maxToppings !== null) {
         this.setState({maxNumberOfToppings: this.props.pizza.maxToppings});
      } else {
         this.setState({maxNumberOfToppings: 'Unlimited!'})
      };
   };

   componentDidMount() {
      this.initializeForm();
   };

   render() {
      if (this.state.submitted) {
         return(
            <Row>
               <Col xs={4} xsOffset={4}>
                  <h1>Pizza added!</h1>
                  <span
                     className="button"
                     onClick={this.props.resetForm}>
                     Add more pizza
                  </span>
                  <br />
                  <br />
                  <Link className="cart" to='/cart'>
                     <span
                        className="button">
                        Go to cart
                     </span>
                  </Link>
               </Col>
            </Row>
         )
      }

      else {
         return(
            <div className="selectToppingsPage">
            <Grid fluid className="selectToppingsGrid">
               <Row className="row">
                 <Col md={4}>
                    <h2>SIZE: {this.props.pizza.name.toUpperCase()}</h2>
                    <h4>Base price: ${this.props.pizza.basePrice.toFixed(2)}</h4>
                    <h5>Max number of toppings: {this.state.maxNumberOfToppings}</h5>
                 </Col>
               </Row>
               <Row>
                 <Col md={7}>
                 </Col>
                  <Col md={4} className="toppingsSelection">
                     <h2>SELECT YOUR TOPPINGS:</h2>
                     <form className="toppings">
                        {this.props.pizza.toppings.map(each => {
                           if (this.state.toppingsMax && !this.state.pickedToppings.includes(each.topping)) {
                              return(
                                 <div key={each.topping.name}>
                                    <label>
                                       <input
                                          type="checkbox"
                                          onChange={() => this.handleToppingChange(each.topping)}
                                          defaultChecked={each.defaultSelected}
                                          name={each.topping.name}
                                          value={each.topping} disabled/>
                                       {each.topping.name} (${each.topping.price.toFixed(2)})
                                    </label>
                                    <br />
                                 </div>
                              )
                           }
                           return(
                              <div key={each.topping.name}>
                                 <label>
                                    <input
                                       type="checkbox"
                                       onChange={() => this.handleToppingChange(each.topping)}
                                       defaultChecked={each.defaultSelected}
                                       name={each.topping.name}
                                       value={each.topping}/>
                                    {each.topping.name} (${each.topping.price.toFixed(2)})
                                 </label>
                              </div>
                           )
                        })}
                     </form>
                     <div>
                       <label className="quantityLabel">
                          QUANTITY:
                          <select
                             className="quantitySelect"
                             onChange={this.selectQuantity}
                             value={this.state.quantity}>

                             {quantityNums.map((num) => {
                                return <option
                                   key={num}
                                   value={num}>
                                   {num}
                                </option>
                             })}
                          </select>
                       </label>
                     </div>
                     <h8 className="totalDisplay">TOTAL: ${this.state.grandTotal.toFixed(2)}</h8>
                     <br />
                     <span
                       className="button"
                       onClick={this.handleAddToCart}>
                         Add to Cart
                     </span>
                     <span
                       className="button"
                       onClick={this.props.resetForm}>
                         Go back
                      </span>
                  </Col>
               </Row>
            </Grid>
        </div>
      )
    }
   };
};
