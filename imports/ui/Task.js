/*//Not sure why when delete this file the display will bug
//This file was part of the meteor tutorial, and we use it for debugging

import React, { Component } from 'react';
//separate functions 
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    // Set the checked property to the opposite of its current value
    //Tasks.update(this.props.task._id, {
    //  $set: { checked: !this.props.task.checked },
    //});
  }
 
  deleteThisTask() {
  	Meteor.call('tasks.remove', this.props.task._id);
      //Tasks.remove(this.props.task._id);
  }

  render() {
  	// Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
 
        <span className="text">{this.props.task.text}</span> 
      </li>
    );
  }
}
*/