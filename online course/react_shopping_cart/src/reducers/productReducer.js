import {FETCH_PRODUCTS, FILTER_PRODUCTS_SIZE, ORDER_PRODUCTS_PRICE} from '../types';

const productReducer = (state = {}, action) => {
	switch (action.type) {
		case FILTER_PRODUCTS_SIZE:
			return {
				...state,
				size: action.payload.size,
				filteredItems: action.payload.items
			};
		case ORDER_PRODUCTS_PRICE:
			return {
				...state,
				sort: action.payload.sort,
				filteredItems: action.payload.items
			};
		case FETCH_PRODUCTS: 
			return {items: action.payload, filteredItems: action.payload}; // || false
    	default:
      		return state;
  	};
};

export default productReducer;