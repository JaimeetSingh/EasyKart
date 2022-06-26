import React, { Component } from 'react';
import ReactTable from 'react-table'
import { Button } from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom'


import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Cart from './components/Cart'
import WomenItems from "./components/WomenItems";
import MenItems from "./components/MenItems";
import Wishlist from './components/Wishlist'
import Detail from './components/Detail'
import Purchased from './components/Purchased'
import ChangePassword from './components/ChangePassword'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/womenitems" component={WomenItems} />
            <Route exact path="/menitems" component={MenItems} />
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/purchased" component={Purchased} />
            <Route exact path="/changePassword" component={ChangePassword} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
