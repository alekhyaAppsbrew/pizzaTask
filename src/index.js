import React from 'react';
import ReactDOM from 'react-dom';
import { 
   createStore, 
   combineReducers, 
   applyMiddleware, 
   compose 
} from 'redux';
import pizzaApp from './reducers';
import HomeContainer from './containers/HomeContainer';
import CartContainer from './containers/CartContainer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {
   ApolloProvider, 
   createNetworkInterface, 
   ApolloClient
} from 'react-apollo';
import './index.css';
import 'react-bootstrap';

const networkInterface = createNetworkInterface({
   uri: 'https://core-graphql.dev.waldo.photos/pizza'
});

const client = new ApolloClient({networkInterface});

const store = createStore(
   combineReducers({
      pizzas: pizzaApp,
      apollo: client.reducer(),
   }),
   {}, 
   compose(
      applyMiddleware(client.middleware()),
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
   )
);

ReactDOM.render(
   <ApolloProvider store={store} client={client}>
      <Router>
         <div>
            <Route exact path='/' component={HomeContainer} />
            <Route exact path='/cart' component={CartContainer} />
         </div>
      </Router>
   </ApolloProvider>,
   document.getElementById('root'),
);
