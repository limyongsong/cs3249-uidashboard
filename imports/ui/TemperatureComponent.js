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
        this.state = {
            startDate: "2013-10-02T03:00:00",
            endDate: "2013-10-03T12:45:00",
            samplingRate: 128,
            data: "",
            graphData: "",
            arrData: "",
        }
  }

  componentDidMount(){
    Tasks.find({}).observeChanges({
            changed: function (id, fields) {
              //console.log("changes");
              if (fields.startDate != undefined){
                this.setState({startDate: fields.startDate});
              } if (fields.endDate != undefined){
                this.setState({endDate: fields.endDate});
              } if (fields.samples != undefined){
                this.setState({samplingRate: fields.samples});
              }
            }.bind(this)
          });
  }
  
  componentDidUpdate(){
      
      const taskSubscription = Meteor.subscribe('tasks');
      Tracker.autorun(() => {
          if (!taskSubscription.ready()) return;
          const a = Tasks.find({timestamp:{$gt: this.state.startDate,
                                          $lt: this.state.endDate}}).fetch();
          //console.log(a);
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
                  
//                    console.log("Key: " + i);
//                    console.log("Value: " + graphData[i]);
                  var temp = new Date(i);
//                    console.log("Default date: " + temp);
                  var tempPlus = new Date(temp.getTime() + 15*60000);
                  var tempMinus = new Date(temp.getTime() - 15*60000);
//                    console.log(graphData[tempPlus]);
//                    console.log(graphData[tempMinus]);
                  
                  if (graphData[tempPlus] != null){
                      count = count + 1;
                      ave = ave + graphData[tempPlus][6]
                  }
                  if (graphData[tempMinus] != null){
                      count = count + 1;
                      ave = ave + graphData[tempMinus][6]
                  }
                  graphData[i].splice(6 ,0 , ave/count);
//                    console.log("New Value: " + graphData[i]);
              }
              arrData.push(graphData[i])
          }
          //console.log(arrData);
          this.state.data = a;
          this.state.graphData = graphData;
          this.state.arrData = arrData
          /* changed to "this.state=" because changed function to be in componentdidupdate instead of componentdidmount
          this.setState({data: a,
                        graphData:graphData,
                        arrData: arrData});
                        */
          this.renderDygraph(this.state.samplingRate);
      });
//        var temp = Tasks.findOne().fetch();
//        
//      this.setState({temp:temp});

  }
  
  renderDygraph(sampling){
      if (this.state.arrData.length >= sampling){
          const delta = Math.floor(this.state.arrData.length/sampling);
          var newArr = [];
          
          for (var i = 0; i < this.state.arrData.length; i=i+delta) {
              newArr.push(this.state.arrData[i]);
          }
          
      }
      else {
          var newArr = this.state.arrData;
      }
      
      
          var g = new Dygraph(
          // containing div
          document.getElementById("graphdiv"),
      
              newArr,
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
