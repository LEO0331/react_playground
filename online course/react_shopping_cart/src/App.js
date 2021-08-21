import React, {Component} from 'react';
import data from "./data.json";
import Products from "./component/Products";
import Filter from "./component/Filter";
import Cart from "./component/Cart";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    };
  }
  createOrder = order => {
    alert("save order later")
  }
  removeItem = p => { //implement minus func
    const cartItems = this.state.cartItems.slice();
    const filtered = cartItems.filter(i => i._id !== p._id) //create a new array
    this.setState({
      cartItems: filtered 
    });
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("cartItems", JSON.stringify(filtered)); //sessionStorage
  };
  addToCart = p => {
    const cartItems = this.state.cartItems.slice();
    let flag = false;
    cartItems.forEach(item => {
      if(item._id === p._id){ //already in cart
        item.count++;
        flag = true;
      }
    });
    if(!flag){
      cartItems.push({...p, count: 1}) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    }
    this.setState({cartItems});
    //https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //convert JS obj to string
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort, //{sort}
      products: this.state.products
        .slice() //shallow copy, not affect original array
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id //Latest
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    if (event.target.value === "ALL") { //all products
      this.setState({size: event.target.value, products: data.products});
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter( //size exist
          product => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href="/">Shopping Cart</a>    
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeItem={this.removeItem} createOrder={this.createOrder} />
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
