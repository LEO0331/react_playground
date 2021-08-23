import React, {Component} from 'react';
import Products from "./component/Products";
import Filter from "./component/Filter";
import Cart from "./component/Cart";

class App extends Component {
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href="/">Shopping Cart</a>    
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products />
            </div>
            <div className="sidebar">
              <Cart />
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
