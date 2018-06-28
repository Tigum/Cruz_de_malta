import './reports.html';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Reports } from '../../../api/reports/reports';


Template.reports.onCreated(function () {
    Session.get('search', '')
    this.autorun(() => {
        this.subscribe('reports')
    })
})

Template.reports.helpers({
    reports() {
        let filter = Session.get('search') ? Session.get('search') : ''
        let selector = {};
        let options = { sort: { createdAt: -1 } }

        if (filter.length > 0) {
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
});