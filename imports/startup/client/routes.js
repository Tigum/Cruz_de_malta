import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/pages/main/wrapper.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/regions/regions.js';
import '../../ui/pages/patios/patios.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'contracts',
  action() {
    BlazeLayout.render('wrapper',  { content: 'contracts' });
  },
});

FlowRouter.route('/regions', {
  name: 'regions',
  action() {
    BlazeLayout.render('wrapper',  { content: 'regions' });
  },
});

FlowRouter.route('/patios', {
  name: 'patios',
  action() {
    BlazeLayout.render('wrapper',  { content: 'patios' });
  },
});