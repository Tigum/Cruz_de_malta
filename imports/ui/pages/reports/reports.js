import './reports.html';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Reports } from '../../../api/reports/reports';


Template.reports.onCreated(function () {
    Session.set('search', '')
    Session.set('reportsLimit', 20)
    this.autorun(() => {
        this.subscribe('reports.limit', Session.get('reportsLimit'))
    })
})

Template.reports.helpers({
    reports() {
        let filter = Session.get('search') ? Session.get('search') : ''
        let selector = {};
        let options = { sort: { createdAt: -1 } }

        if (filter.length > 1) {
            let regexOptions = {
                $regex: filter,
                $options: 'i',
            };
            selector['$or'] = [{
                period: regexOptions,
            }, {
                _id: regexOptions,
            }, {
                date: regexOptions,
            }, {
                patio: regexOptions,
            }];
            return Reports.find(selector, options) ? Reports.find(selector, options).fetch() : []
        } else {
            return Reports.find(selector, options) ? Reports.find(selector, options).fetch() : []
        }
    },
    hideButton() {
        const reports = Reports.find() ? Reports.find().fetch() : []
        return reports.length == Session.get('reportsLimit') ? true : false
    }
});

Template.report_item.helpers({
    isProfitable(reportId) {
        if(!Reports.findOne({ _id: reportId })) return
        if(!Reports.findOne({ _id: reportId }).balance) return
        return Reports.findOne({ _id: reportId }).balance > 0 ? true : false
    }
});

Template.report_item.events({
    'click .deleteReport'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja deletar este relatório permanentemente?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        const reportId = clickedItem.attr('data-report-id')
        Meteor.call('reports.delete', reportId)
    },
    'click .seeContracts'(event, template) {
        event.preventDefault();
        const clickedItem = $(event.currentTarget);
        const reportId = clickedItem.attr('data-report-id')
        const contracts = Reports.findOne({_id: reportId}).contracts

        Meteor.call('user.addReportId', Meteor.userId(), reportId)
        Meteor.call('user.addReportDetails', Meteor.userId(), contracts)
        FlowRouter.go('/report_details')
    },
})

Template.reports.events({
    'click .seeMore'(event, template) {
        event.preventDefault();
        Session.set('reportsLimit', Session.get('reportsLimit') + 20) 
    },
})