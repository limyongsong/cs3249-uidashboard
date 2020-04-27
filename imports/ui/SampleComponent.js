import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.js';

import './samplecomponent.css'
 
// App component - represents the whole app
class SampleComponent extends Component { 
  constructor(props) {
    super(props);
      this.state = { 
        samples: 128, /* default samples*/
      };
  }
  render() {
    return (
      <div className="container">
        <header className="SampleHeader">

         <h1>Sample </h1>

        </header>
 
        <center>
        <h2><input type="number" id="samplesid" min="1" max="4096" value={this.state.samples}/></h2>
        </center>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(SampleComponent);