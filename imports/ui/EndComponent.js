import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

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
  componentDidMount(){
    Meteor.call('tasks.updateEnd', "855", this.state.endDate, this.state.endTime); 
     Tasks.find({}).observeChanges({
          changed: function (id, fields) {
            if (fields.endDate != undefined){
              var answer_array = fields.endDate.split('T');
              this.setState({endDate: answer_array[0]});
              this.setState({endTime: answer_array[1]});
            } 
          }.bind(this)
        });
  }
  componentDidUpdate(){
    const taskSubscription = Meteor.subscribe('tasks');
     Tracker.autorun(() => {
          if (!taskSubscription.ready()) return;
        });
  }
  updateDate(e){
    this.setState({endDate: e.target.value});
    Meteor.call('tasks.updateEnd', "855", e.target.value, this.state.endTime); 
  }
  updateTime(e){
    this.setState({endTime: e.target.value});
    Meteor.call('tasks.updateEnd', "855", this.state.endDate, e.target.value); 
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