import { Meteor } from 'meteor/meteor';
//import '../imports/api/tasks.js';
import { Tasks } from '../imports/api/tasks.js';
//for csv parsing
import Papa from 'papaparse';

Meteor.startup(() => {
  // code to run on server at startup
  //Initiate the target info like start date/time etc
  Meteor.call('tasks.initiate', "initiate");
  //Fill the database with the csv file if it is not yet done
  if(Meteor.call('tasks.checkCount')<=1){
	var csv = Assets.getText('room-temperatures.csv');
	var rows = Papa.parse(csv).data;
	rows.forEach (function (item, index, array){
	  if (index!=0){ //index 0 is the header of csv file	
	    Meteor.call('tasks.getcsv', item[0], item[1], item[2]);
	  }
	})
  }
    
    Meteor.publish('tasks', function(){
                 return Tasks.find();
    })
});
