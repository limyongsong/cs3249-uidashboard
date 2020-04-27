import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import LeftPane from '../imports/ui/LeftPane.js';
import RightPane from '../imports/ui/RightPane.js';
import StartComponent from '../imports/ui/StartComponent.js';
import EndComponent from '../imports/ui/EndComponent.js';
import SampleComponent from '../imports/ui/SampleComponent.js';
import TemperatureComponent from '../imports/ui/TemperatureComponent.js';
import FloorPlanComponent from '../imports/ui/FloorPlanComponent.js';

Meteor.startup(()=> {
	//Left and right pane just used for nesting flexboxes
  //render(<LeftPane />, document.getElementById('render-target'));
  //render(<RightPane />, document.getElementById('render-target2'));
  render(<StartComponent />, document.getElementById('c1'));
  render(<EndComponent />, document.getElementById('c2'));
  render(<SampleComponent />, document.getElementById('c3'));
  render(<TemperatureComponent />, document.getElementById('c4'));
  render(<FloorPlanComponent />, document.getElementById('c5'));
});
