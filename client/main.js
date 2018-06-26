// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';
import 'jquery';

//added to solve height 100% problem
BlazeLayout.setRoot('body');