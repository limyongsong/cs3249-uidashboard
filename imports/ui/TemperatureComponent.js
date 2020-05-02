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
            data: [],
            graphData: {},
            arrData: [],
            r0: true,
            r1: true,
            r2: true,
            r3: true,
            r4: true,
            r5: true,
            r6: true,
            r0avgTemp: 12,
            r1avgTemp: 14,
            r2avgTemp: 16,
            r3avgTemp: 18,
            r4avgTemp: 20,
            r5avgTemp: 22,
            r6avgTemp: 24,
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
                this.setState({samplingRate: Number(fields.samples)});
              } if (fields.r0 != undefined){
                this.setState({r0: fields.r0});
              } if (fields.r1 != undefined){
                this.setState({r1: fields.r1});
              } if (fields.r2 != undefined){
                this.setState({r2: fields.r2});
              } if (fields.r3 != undefined){
                this.setState({r3: fields.r3});
              } if (fields.r4 != undefined){
                this.setState({r4: fields.r4});
              } if (fields.r5 != undefined){
                this.setState({r5: fields.r5});
              } if (fields.r6 != undefined){
                this.setState({r6: fields.r6});
              } 
            }.bind(this)
          });
      
      
      const taskSubscription = Meteor.subscribe('tasks');
      Tracker.autorun(() => {
          if (!taskSubscription.ready()) return;
          const a = Tasks.find({timestamp:{$gt: "2013-10-02T05:00:00",
                                          $lt: "2013-12-03T15:15:00"}}).fetch();
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
          var aveData = [0,0,0,0,0,0,0];
          
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
              
              aveData[0] = aveData[0] + graphData[i][1];
              aveData[1] = aveData[1] + graphData[i][2];
              aveData[2] = aveData[2] + graphData[i][3];
              aveData[3] = aveData[3] + graphData[i][4];
              aveData[4] = aveData[4] + graphData[i][5];
              aveData[5] = aveData[5] + graphData[i][6];
              aveData[6] = aveData[6] + graphData[i][7];
              arrData.push(graphData[i])
          }
          
          aveData = aveData.map(e => {
              var result = e/Object.keys(graphData).length;
              result = result.toFixed(3);
              return Number(result)}
                               )
          //console.log(arrData);
//          this.state.data = a;
//          this.state.graphData = graphData;
//          this.state.arrData = arrData;
//          this.state.aveData = aveData;
//          this.state.r0avgTemp = aveData[0];
//          this.state.r1avgTemp = aveData[1];
//          this.state.r2avgTemp = aveData[2];
//          this.state.r3avgTemp = aveData[3];
//          this.state.r4avgTemp = aveData[4];
//          this.state.r5avgTemp = aveData[5];
//          this.state.r6avgTemp = aveData[6];
//         changed to "this.state=" because changed function to be in componentdidupdate instead of componentdidmount
          console.log("setstate from ComponentDidMount");
          this.setState({data: a,
                        graphData:graphData,
                        arrData: arrData,
                        aveData: aveData,
                        r0avgTemp: aveData[0],
                        r1avgTemp: aveData[1],
                        r2avgTemp: aveData[2],
                        r3avgTemp: aveData[3],
                        r4avgTemp: aveData[4],
                        r5avgTemp: aveData[5],
                        r6avgTemp: aveData[6],
                        });
                        
          
          this.renderDygraph(this.state.samplingRate);
      });
  }
  
  componentDidUpdate(){
      
      
   
      this.renderDygraph(this.state.samplingRate);
      this.updateRooms();
      


  }
    
    updateDateTimeComponents(){
        Meteor.call('tasks.updateEnd', "855", this.state.endDate.substring(0,10), this.state.endTime.substring(11,19));
        Meteor.call('tasks.updateStart', "855", this.state.startDate.substring(0,10), this.state.startTime.substring(11,19)); 
      };
    
    updateRooms(){
    Meteor.call('tasks.updateFloorPlan', 
      "855", 
      this.state.r0,
      this.state.r1,
      this.state.r2,
      this.state.r3,
      this.state.r4,
      this.state.r5,
      this.state.r6,
      this.state.r0avgTemp,
      this.state.r1avgTemp,
      this.state.r2avgTemp,
      this.state.r3avgTemp,
      this.state.r4avgTemp,
      this.state.r5avgTemp,
      this.state.r6avgTemp,
      ); 
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
      
      var aveData = [0,0,0,0,0,0,0];
      var count = 0;
      
      console.log(typeof(newArr));
      console.log(newArr);
      newArr.forEach(element => {
          //              console.log(element);
          
          
          if ((Date.parse(this.state.startDate) <= Date.parse(element[0])) && Date.parse(this.state.endDate) >= Date.parse(element[0])) {
              count = count + 1;
              console.log('test');
              aveData[0] = aveData[0] + element[1];
              aveData[1] = aveData[1] + element[2];
              aveData[2] = aveData[2] + element[3];
              aveData[3] = aveData[3] + element[4];
              aveData[4] = aveData[4] + element[5];
              aveData[5] = aveData[5] + element[6];
              aveData[6] = aveData[6] + element[7];
          }
          
      })
      
      if (count>0){      
      aveData = aveData.map(e => {
          var result = e/count;
          result = result.toFixed(3);
          return Number(result)}
                           )
      console.log(this.state.aveData);
      console.log(aveData);
      if (this.state.aveData[0] != aveData[0]){
          console.log("setstate from before Dygraph render");
          this.setState({
              aveData: aveData,
              r0avgTemp: aveData[0],
              r1avgTemp: aveData[1],
              r2avgTemp: aveData[2],
              r3avgTemp: aveData[3],
              r4avgTemp: aveData[4],
              r5avgTemp: aveData[5],
              r6avgTemp: aveData[6],
          })
      }}
      
      
      
      
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
              labels: ["Timestamp", "Room 0", "Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"],
               visibility: [this.state.r0, this.state.r1, this.state.r2, this.state.r3, this.state.r4, 
                        this.state.r5, this.state.r6],
               dateWindow: [Date.parse(this.state.startDate),Date.parse(this.state.endDate)] ,
              zoomCallback: function (minX, maxX, yRanges){
                  var newStart = new Date(minX).toISOString().substring(0,19);
                  var newEnd = new Date(maxX).toISOString().substring(0,19);
                  console.log(newStart);
                  updateDateTime(newStart, newEnd);
              }}
          );
      
      function tempFunc(newStart, newEnd){
          
          console.log("setstate from Dygraph");

          this.setState({startDate: newStart,
                         endDate: newEnd,});

                                
          Meteor.call('tasks.updateStart', "855", newStart.substring(0,10), newStart.substring(11,19));
          Meteor.call('tasks.updateEnd', "855", newEnd.substring(0,10), newEnd.substring(11,19));

           
          
      };
      
      const updateDateTime = tempFunc.bind(this);

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
