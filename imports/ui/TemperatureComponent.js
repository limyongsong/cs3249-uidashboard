import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Mongo } from 'meteor/mongo'

import { Meteor } from 'meteor/meteor';

import { Tracker } from 'meteor/tracker'
 
import { Tasks } from '../api/tasks.js';

import { createContainer } from 'meteor/react-meteor-data';

import './temperaturecomponent.css'

import Dygraph from 'dygraphs';
//const g = new Dygraph(div, data, {});
 
// App component - represents the whole app
class TemperatureComponent extends Component { 
    constructor(props) {
      super(props);
      
  }
    
    componentDidMount(){
        
        const taskSubscription = Meteor.subscribe('tasks');
        Tracker.autorun(() => {
            if (!taskSubscription.ready()) return;
            const a = Tasks.find().fetch();
            console.log(a);
            var tempcsv = "Date,Room 0\n";
            a.forEach(data => {
                if (data.RoomID == "0"){
                    tempcsv = tempcsv + data.timestamp + "," + data.temperature + "\n";
                }
                
            })
            this.setState({data: a,
                          tempcsv:tempcsv})
            this.renderDygraph();
        });
//        var temp = Tasks.findOne().fetch();
//        
//      this.setState({temp:temp});

    }
    
    renderDygraph(){
            var g = new Dygraph(
            // containing div
            document.getElementById("graphdiv"),
        
                this.state.tempcsv,
            // CSV or path to a CSV file.
//            "Date,Temperature1, Temperature 2\n" +
//            "2008-05-07,75,\n" +
//            "2008-05-08,70,\n" +
//            "2008-05-09,,80\n"+
//            "2008-05-07,,34\n"   ,
                {width: 600}
            );

    }
 
  render() {
    return (
      <div className="container2">
        <header className="TemperatureHeader">

         <h1>Temperature </h1>

        </header>
        <div className="graphContainer">
            <div className="graph" id="graphdiv">
            </div>
        </div>
 
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(TemperatureComponent);
