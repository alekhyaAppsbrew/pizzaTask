export const ADD_PIZZA = 'ADD_PIZZA';
export const REMOVE_PIZZA = 'REMOVE_PIZZA';
export const UPDATE_PIZZA = 'UPDATE_PIZZA';

export function addPizza(pizza){
   return {type: ADD_PIZZA, pizza};
};

export function removePizza(pizza){
   return {type: REMOVE_PIZZA, pizza};
};

export function updatePizza(pizza){
   return {type: UPDATE_PIZZA, pizza};
};
