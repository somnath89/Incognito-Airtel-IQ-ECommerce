import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import BloomHome from './BloomHome';
import TrackOrder from './TrackOrderUpdated';
import OrderSummary from './OrderSummary';
import MensHome from './MensHome';
import WomensHome from './WomensHome';


function App() {
  
  return (
    <Switch>
      <Route exact path='/' render={() => (<BloomHome/>)}/>
      <Route exact path='/track' render={() => (<TrackOrder/>)}/>
      <Route exact path='/order_confirm' render={() => (<OrderSummary/>)}/>
      <Route exact path='/mens' render={() => (<MensHome/>)}/>
      <Route exact path='/womens' render={() => (<WomensHome/>)}/>
    </Switch>

  );
}

export default App;
