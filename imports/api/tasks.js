import { Mongo } from 'meteor/mongo';
//separate functions (if want make secure use check)
//we don't need to care about security for this app, so 'check' not used
//'insecure' and 'autopublish' not removed
//Mainly because it is the engineers that are accessing the dashboard, we assume they are the correct person
//To make optimistic UI, method defined on server and called on client
import { Meteor } from 'meteor/meteor';
 
//create a collection to store data
//Tasks is the data that we need to create our graphs
export const Tasks = new Mongo.Collection('tasks');

//separate functions 
Meteor.methods({
  'tasks.initiate'(text){
    //we only want 1 input to store the target data to update from
    //"855" is just an arbitrary id to identify the input by
    if (Tasks.find({_id:"855"}).count()==0){
    Tasks.insert({
      text,
      _id :  "855",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      samples: "",
      r0: false, //true means room is clicked
      r1: false,
      r2: false,
      r3: false,
      r4: false,
      r5: false,
      r6: false,
      r0avgTemp: 0,
      r1avgTemp: 0,
      r2avgTemp: 0,
      r3avgTemp: 0,
      r4avgTemp: 0,
      r5avgTemp: 0,
      r6avgTemp: 0,
    });}
  },
  'tasks.updateStart'(id, startDate, startTime){
    Tasks.update(id, {$set: {startDate: startDate, startTime: startTime}});
  },
  'tasks.updateEnd'(id, endDate, endTime){
    Tasks.update(id, {$set: {endDate: endDate, endTime: endTime}});
  },
  'tasks.updateSamples'(id, samples){
    Tasks.update(id, {$set: {samples: samples}});
  },
  'tasks.updateFloorPlan'(id, r0,r1,r2,r3,r4,r5,r6,r0avgTemp,r1avgTemp,r2avgTemp,r3avgTemp,r4avgTemp,r5avgTemp,r6avgTemp){
    Tasks.update(id, {$set: 
      {r0: r0,
      r1: r1,
      r2: r2,
      r3: r3,
      r4: r4,
      r5: r5,
      r6: r6,
      r0avgTemp: r0avgTemp,
      r1avgTemp: r1avgTemp,
      r2avgTemp: r2avgTemp,
      r3avgTemp: r3avgTemp,
      r4avgTemp: r4avgTemp,
      r5avgTemp: r5avgTemp,
      r6avgTemp: r6avgTemp,
      }});
  },
  //csv data
  'tasks.getcsv'(RoomID, timestamp, temperature){
    Tasks.insert({
      RoomID: RoomID,
      timestamp: timestamp,
      temperature: temperature,
    });
  },
  'tasks.checkCount'(){ 
    return Tasks.find({}).count();
  },
  /*Not used ecept for checking
  'tasks.insert'(text) {
 
    Tasks.insert({
      text,//wasjust "text,"
      createdAt: new Date(),
    });
  },
  'tasks.remove'(taskId) {
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  */
});