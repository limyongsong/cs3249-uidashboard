import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import './floorplancomponent.css';
 
// App component - represents the whole app
class FloorPlanComponent extends Component { 
  constructor(props) {
      super(props);
      this.state = { 
          r0: true, //true means room is clicked
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
      };
      //gives the color based on avg temp, VIEWModel part
      this.determineColor = this.determineColor.bind(this);
      this.updateRooms = this.updateRooms.bind(this);
  }
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
  componentDidMount(){
    this.updateRooms();
     Tasks.find({}).observeChanges({
      changed: function (id, fields) {
        if (fields.r0avgTemp != undefined){
          this.setState({r0avgTemp: fields.r0avgTemp});
        } if (fields.r1avgTemp != undefined){
          this.setState({r1avgTemp: fields.r1avgTemp});
        } if (fields.r2avgTemp != undefined){
          this.setState({r2avgTemp: fields.r2avgTemp});
        } if (fields.r3avgTemp != undefined){
          this.setState({r3avgTemp: fields.r3avgTemp});
        } if (fields.r4avgTemp != undefined){
          this.setState({r4avgTemp: fields.r4avgTemp});
        } if (fields.r5avgTemp != undefined){
          this.setState({r5avgTemp: fields.r5avgTemp});
        } if (fields.r6avgTemp != undefined){
          this.setState({r6avgTemp: fields.r6avgTemp});
        } 
      }.bind(this)
    });
  }
  componentDidUpdate(){
    this.updateRooms();
    const taskSubscription = Meteor.subscribe('tasks');
     Tracker.autorun(() => {
          if (!taskSubscription.ready()) return;
        });
  }
  toggleR0(){this.setState({r0: !this.state.r0});}
  toggleR1(){this.setState({r1: !this.state.r1});}
  toggleR2(){this.setState({r2: !this.state.r2});}
  toggleR3(){this.setState({r3: !this.state.r3});}
  toggleR4(){this.setState({r4: !this.state.r4});}
  toggleR5(){this.setState({r5: !this.state.r5});}
  toggleR6(){this.setState({r6: !this.state.r6});}
  determineColor(room, avgTemp){ //room is r0-r6 true/false
    if (room && avgTemp<13){
      return "#cce0ff";
    } else if (room && avgTemp<15){
      return "#99c2ff";
    } else if (room && avgTemp<17){
      return "#66a3ff";
    } else if (room && avgTemp<18){
      return "#3385ff";
    } else if (room && avgTemp<20){
      return "#0066ff";
    } else if (room && avgTemp<22){
      return "#0052cc";
    } else if (room && avgTemp<24){
      return "#003d99";
    } else if (room && avgTemp>=24){
      return "#002966";
    } else { //room not selected
      return "white";
    }
  }
  render() {
    return (
      <div className="container2">
        <header className="FloorPlanHeader">

         <h1>FloorPlan </h1>

        </header>
        <center>
        <svg height="300" width="100%">
            <g className="Room0">
              <rect className="Room0color" x="0%" y="0%" height="40%" width="42%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r0, this.state.r0avgTemp)} onClick={this.toggleR0.bind(this)}/>
              <text x="2%" y = "20%" font-size="100%" fill="black">Room 0</text>
            </g>
            <g className="Room1">
              <rect className="Room1color" x="0%" y="60%" height="40%" width="16.7%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r1, this.state.r1avgTemp)} onClick={this.toggleR1.bind(this)}/>
              <text x="2%" y = "80%" font-size="100%" fill="black">Room 1</text>
            </g>
            <g className="Room2">
              <rect className="Room2color" x="16.7%" y="60%" height="40%" width="16.7%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r2, this.state.r2avgTemp)} onClick={this.toggleR2.bind(this)}/>
              <text x="18.7%" y = "80%" font-size="100%" fill="black">Room 2</text>
            </g>
            <g className="Room3">
              <rect className="Room3color" x="33.4%" y="60%" height="40%" width="16.7%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r3, this.state.r3avgTemp)} onClick={this.toggleR3.bind(this)}/>
              <text x="35.4%" y = "80%" font-size="100%" fill="black">Room 3</text>
            </g>
            <g className="Room4">
              <rect className="Room4color" x="50.1%" y="60%" height="40%" width="16.7%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r4, this.state.r4avgTemp)} onClick={this.toggleR4.bind(this)}/>
              <text x="52.1%" y = "80%" font-size="100%" fill="black">Room 4</text>
            </g>
            <g className="Room5">
              <rect className="Room5color" x="66.8%" y="60%" height="40%" width="16.6%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r5, this.state.r5avgTemp)} onClick={this.toggleR5.bind(this)}/>
              <text x="68.8%" y = "80%" font-size="100%" fill="black">Room 5</text>
            </g>
            <g className="Room6">
              <rect className="Room6color" x="83.4%" y="60%" height="40%" width="16.6%" stroke="black" stroke-width="2" fill={this.determineColor(this.state.r6, this.state.r6avgTemp)} onClick={this.toggleR6.bind(this)}/>
              <text x="85.4%" y = "80%" font-size="100%" fill="black">Room 6</text>
            </g>
            <rect className="background" x="0%" y="0%" height="100%" width="100%" stroke="black" stroke-width="5" fill="none" />
        </svg>
        </center>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(FloorPlanComponent);