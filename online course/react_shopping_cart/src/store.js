import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';

//https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productReducer,
        cart: cartReducer,
        order: orderReducer
    }), {}, composeEnhancer(applyMiddleware(thunk))
);

export default store;