import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="App-header">
            <Link to="/">Shopping Cart</Link>
            <Link to="/admin">Admin</Link>    
          </header>
          <main>
            <Route path="/admin" component={AdminScreen} />
            <Route path="/" component={HomeScreen} exact />
          </main>
          <footer>All rights reserved</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
