import React, {Component} from "react";
import Filter from "../component/Filter";
import Products from "../component/Products";
import Cart from "../component/Cart";

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
