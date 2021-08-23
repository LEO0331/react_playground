import {FETCH_PRODUCTS} from '../types';

const productReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS: 
			return {items: action.payload}; // || false
    	default:
      		return state;
  	};
};

export default productReducer;