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
            const a = Tasks.find({timestamp:{
                                            $lt: "2013-11-16T04:30:00"}}).fetch();
            console.log(a);
            var graphData = {};
            a.forEach(data => {
                const date = new Date(data.timestamp);
                if (data.RoomID == "0"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(1, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(1, 0, Number(data.temperature));
                    }
                }
                if (data.RoomID == "1"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(2, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(2, 0, Number(data.temperature));
                    }
                }if (data.RoomID == "2"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(3, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(3, 0, Number(data.temperature));
                    }
                }if (data.RoomID == "3"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(4, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(4, 0, Number(data.temperature));
                    }
                }if (data.RoomID == "4"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(5, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(5, 0, Number(data.temperature));
                    }
                }if (data.RoomID == "5"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(6, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(6, 0, Number(data.temperature));
                    }
                }if (data.RoomID == "6"){
                    if (!(date in graphData)){
                        graphData[date] = [date];
                        graphData[date].splice(7, 0, Number(data.temperature));
                    }
                    else if (date in graphData){
                        graphData[date].splice(7, 0, Number(data.temperature));
                    }
                }
                
            })
            var arrData = [];
            for (var i in graphData) {
                if (graphData[i].length == 7) {
                    var count = 0;
                    var ave = 0;
                    
                    console.log("Key: " + i);
                    console.log("Value: " + graphData[i]);
                    var temp = new Date(i);
                    console.log("Default date: " + temp);
                    var tempPlus = new Date(temp.getTime() + 15*60000);
                    var tempMinus = new Date(temp.getTime() - 15*60000);
                    console.log(graphData[tempPlus]);
                    console.log(graphData[tempMinus]);
                    
                    if (graphData[tempPlus] != null){
                        count = count + 1;
                        ave = ave + graphData[tempPlus][6]
                    }
                    if (graphData[tempMinus] != null){
                        count = count + 1;
                        ave = ave + graphData[tempMinus][6]
                    }
                    graphData[i].splice(6 ,0 , ave/count);
                    console.log("New Value: " + graphData[i]);
                }
                arrData.push(graphData[i])
            }
            console.log(arrData);
            this.setState({data: a,
                          graphData:graphData,
                          arrData: arrData})
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
        
                this.state.arrData,
            // CSV or path to a CSV file.
//            "Date,Temperature1, Temperature 2\n" +
//            "2008-05-07,75,\n" +
//            "2008-05-08,70,\n" +
//            "2008-05-09,,80\n"  ,
                {width: 600,
                labels: ["Timetamp", "Room 0", "Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"]}
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
