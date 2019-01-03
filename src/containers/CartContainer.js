import { connect } from 'react-redux';
import { removePizza } from '../actions';
import Cart from '../components/Cart';

const getPizzas = pizza => {
   return pizza;
};

const mapStateToProps = (state) => ({
   store: getPizzas(state.pizzas)
});

const mapDispatchToProps = {
   handleRemovePizza: removePizza
};

const CartContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Cart);

export default CartContainer;
