import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import './startcomponent.css'
 
// App component - represents the whole app
class StartComponent extends Component { 
  constructor(props) {
    super(props);
      this.state = { 
        startDate: '2013-10-02', /* default date&time*/
        startTime: '05:00:00', 
      };
  }
  componentDidMount(){
    Meteor.call('tasks.updateStart', "855", this.state.startDate, this.state.startTime); 
  }
  updateDate(e){
    this.setState({startDate: e.target.value});
    Meteor.call('tasks.updateStart', "855", e.target.value, this.state.startTime); 
  }
  updateTime(e){
    this.setState({startTime: e.target.value});
    Meteor.call('tasks.updateStart', "855", this.state.startDate, e.target.value); 
  }
  render() {
    return (
      <div className="container">
        <header className="StartHeader">

         <h1>Start </h1>

        </header>

        <center>
        <h2><input type="date" id="startdateid" value={this.state.startDate} onChange={this.updateDate.bind(this)}/></h2>
        <h2><input type="time" id="starttimeid" value={this.state.startTime} onChange={this.updateTime.bind(this)}/></h2>
        </center>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(StartComponent);