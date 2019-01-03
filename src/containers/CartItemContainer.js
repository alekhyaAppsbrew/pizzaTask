import { connect } from 'react-redux';
import { updatePizza } from '../actions';
import CartItem from '../components/CartItem';

const getPizzas = pizza => {
   return pizza;
};

const mapStateToProps = (state) => ({
   store: getPizzas(state.pizzas)
});

const mapDispatchToProps = {
   handleUpdatePizza: updatePizza
};

const CartItemContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(CartItem);

export default CartItemContainer;
