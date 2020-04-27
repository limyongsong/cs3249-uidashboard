import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.js';

import './endcomponent.css'
 
// App component - represents the whole app
class EndComponent extends Component { 
  constructor(props) {
    super(props);
      this.state = { 
        endDate: '2013-10-03', /* default end date&time*/
        endTime: '12:45:00',  /*, just nice 128 samples from start date*/
      };
  }
  updateDate(e){
    this.setState({endDate: e.target.value});
  }
  updateTime(e){
    this.setState({endTime: e.target.value});
  }
  render() {
    return (
      <div className="container">
        <header className="EndHeader">

         <h1>End </h1>

        </header>
 
        <center>
        <h2><input type="date" id="enddateid" value={this.state.endDate} onChange={this.updateDate.bind(this)}/></h2>
        <h2><input type="time" id="endtimeid" value={this.state.endTime} onChange={this.updateTime.bind(this)}/></h2>
        </center>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(EndComponent);