import {FETCH_PRODUCTS, FILTER_PRODUCTS_SIZE, ORDER_PRODUCTS_PRICE, ADD_TO_CART, REMOVE_FROM_CART} from './types';

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

export const addToCart = (items, product) => async dispatch => {
	const cartItems = items.slice(); //create a new array
	let flag = false;
	cartItems.forEach(element => { //already in cart
		if(element._id === product._id){
			element.count++;
        	flag = true;
		}
	});
	if(!flag){
		cartItems.push({...product, count: 1}) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
	};
	dispatch({
		type: ADD_TO_CART, 
		payload: {cartItems}
	});
	//https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //convert JS obj to string
}

export const removeFromCart = (items, product) => async dispatch => {
	const cartItems = items.slice().filter(i => i._id !== product._id); 
	dispatch({
		type: REMOVE_FROM_CART, 
		payload: {cartItems}
	});
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //sessionStorage
}