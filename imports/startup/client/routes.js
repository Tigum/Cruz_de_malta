import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/pages/main/wrapper.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/contracts_arquived/contracts_arquived.js';
import '../../ui/pages/regions/regions.js';
import '../../ui/pages/patios/patios.js';
import '../../ui/pages/reports/reports.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/report_details/report_details.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'contracts',
  action() {
    BlazeLayout.render('wrapper',  { content: 'contracts' });
  },
});

FlowRouter.route('/login', {
  name: 'contracts',
  action() {
    BlazeLayout.render('login');
  },
});

FlowRouter.route('/contracts_arquived', {
  name: 'contracts_arquived',
  action() {
    BlazeLayout.render('wrapper',  { content: 'contracts_arquived' });
  },
});

FlowRouter.route('/reports', {
  name: 'reports',
  action() {
    BlazeLayout.render('wrapper',  { content: 'reports' });
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

FlowRouter.route('/report_details', {
  name: 'report_details',
  action() {
    BlazeLayout.render('wrapper',  { content: 'report_details' });
  },
});
