import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.js';
 
// App component - represents the whole app
class RightPane extends Component { 
 
  render() {
    return (
      <div>
 
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(RightPane);