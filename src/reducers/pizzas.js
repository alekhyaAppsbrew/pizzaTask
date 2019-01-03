import {
   ADD_PIZZA, 
   REMOVE_PIZZA,
   UPDATE_PIZZA
} from '../actions';

//this is used to create a unique ID for each pizza that is added
let nextPizzaID = 0;

const pizzas = (state = [], action) => {
   switch (action.type) {
      case ADD_PIZZA:
         nextPizzaID++;
         return [
            ...state,
            {
               size: action.pizza.size,
               toppings: action.pizza.toppings,
               basePrice: action.pizza.basePrice,
               quantity: action.pizza.quantity,
               id: nextPizzaID
            },
         ];
      case REMOVE_PIZZA:
         return state.filter(pizza => pizza.id !== action.pizza.id);
      case UPDATE_PIZZA:
         return state.map(
            pizza => pizza.id === action.pizza.id ? action.pizza : pizza
         );
      default:
         return state;
   }
}

export default pizzas
