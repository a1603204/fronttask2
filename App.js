import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Customers from './Customers';
import Trainings from './Trainings';

class App extends Component {
    render() {
    return (

        <BrowserRouter>
          <div>

            <Link to="/customers">Customers</Link>{' '}
            <Link to="/trainings">Trainings</Link>{' '}

            <Switch>
          
              <Route path = "/customers" component={Customers} />
              <Route path = "/trainings" component={Trainings} />

            </Switch>
          </div>
</BrowserRouter>
    );
  }
}

export default App;
