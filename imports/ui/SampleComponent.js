import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import './samplecomponent.css'
 
// App component - represents the whole app
class SampleComponent extends Component { 
  constructor(props) {
    super(props);
      this.state = { 
        samples: 128, /* default samples*/
      };
  }
  componentDidMount(){
    Meteor.call('tasks.updateSamples', "855", this.state.samples); 
  }
  updateSamples(e){
    if (e.target.value < 2) e.target.value = 2;
    if (e.target.value > 4096) e.target.value = 4096;
    this.setState({samples: e.target.value});
    Meteor.call('tasks.updateSamples', "855", e.target.value); 
  }
  render() {
    return (
      <div className="container">
        <header className="SampleHeader">

         <h1>Sample </h1>

        </header>
 
        <center>
        <h2><input type="number" id="samplesid" min="1" max="4096" value={this.state.samples} onChange={this.updateSamples.bind(this)}/></h2>
        </center>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(SampleComponent);