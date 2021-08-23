import {FETCH_PRODUCTS, FILTER_PRODUCTS_SIZE, ORDER_PRODUCTS_PRICE} from './types';

export const fetchProducts = () => async dispatch => { 
	const res = await fetch('/api/products');
	const data = await res.json();
	dispatch({type: FETCH_PRODUCTS, payload: data});
};

export const filterProduct = (products, size) => async dispatch => { 
	dispatch({
		type: FILTER_PRODUCTS_SIZE, 
		payload: {
			size: size,
			items: size === "" ? products : products.filter(p => p.availableSizes.indexOf(size) >= 0)
		}
	});
};

export const sortProduct = (filterProduct, sort) => async dispatch => { 
	const sortedProduct = filterProduct.slice(); //sort filtered products
	if(sort === "latest"){
		sortedProduct.sort((a, b) => (a._id < b._id ? 1 : -1));
	}else if(sort === "lowest"){
		sortedProduct.sort((a, b) => (a.price > b.price ? 1 : -1));
	}else if(sort === "highest"){
		sortedProduct.sort((a, b) => (a.price < b.price ? 1 : -1));
	}
	dispatch({
		type: ORDER_PRODUCTS_PRICE, 
		payload: {
			sort: sort,
			items: sortedProduct
		}
	});
};