import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer from './products';
import categoriesReducer from './categories';
import productTypeReducer from './productType';
import favoritesReducer from './favorites';
import ordersReducer from './orders';
import orderItemsReducer from './orderItems';

const rootReducer = combineReducers({
  session,
  categories: categoriesReducer,
  products: productsReducer,
  productType: productTypeReducer,
  favorites: favoritesReducer,
  orders: ordersReducer,
  orderItem: orderItemsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
