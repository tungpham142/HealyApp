// Import ReactDOM and React
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home/Home';

export default class App extends React.Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
              <Route path = "/" exact component={Home}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
