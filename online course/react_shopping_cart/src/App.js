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
