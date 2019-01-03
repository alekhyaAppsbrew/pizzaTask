import { connect } from 'react-redux';
import { addPizza } from '../actions';
import Home from '../components/Home';

const getPizzas = pizza => {
   return pizza;
};

const mapStateToProps = (state) => ({
   store: getPizzas(state.pizzas)
});

const mapDispatchToProps = {
   handleAddPizza: addPizza
};

const HomeContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Home);

export default HomeContainer;
