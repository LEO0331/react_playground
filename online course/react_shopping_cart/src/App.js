import React, {Component} from 'react';
import Products from "./component/Products";
import Filter from "./component/Filter";
import Cart from "./component/Cart";

class App extends Component {
  constructor() {
    super();
    this.state = {
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
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href="/">Shopping Cart</a>    
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter/>
              <Products addToCart={this.addToCart} />
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
