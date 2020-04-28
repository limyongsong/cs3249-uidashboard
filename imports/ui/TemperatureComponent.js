import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import './temperaturecomponent.css'
 
// App component - represents the whole app
class TemperatureComponent extends Component { 
 
  render() {
    return (
      <div className="container2">
        <header className="TemperatureHeader">

         <h1>Temperature </h1>

        </header>
 
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(TemperatureComponent);
