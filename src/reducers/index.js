import pizzas from './pizzas';

export default function pizzaApp(state = {}, action) {
   return {
      pizzas: pizzas(state.pizzas, action)
   };
};
