import { Mongo } from 'meteor/mongo';
//separate functions (if want make secure use check)
//we don't need to care about security for this app, so 'check' not used
//'insecure' and 'autopublish' not removed
//Mainly because it is the engineers that are accessing the dashboard, we assume they are the correct person
//To make optimistic UI, method defined on server and called on client
import { Meteor } from 'meteor/meteor';
 
export const Tasks = new Mongo.Collection('tasks');
//create a collection to store data

//separate functions 
Meteor.methods({
  'tasks.insert'(text) {
 
    Tasks.insert({
      text,
      createdAt: new Date(),
    });
  },
  'tasks.remove'(taskId) {
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});