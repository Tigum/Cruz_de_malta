import './report_details.html';
import '../modals/add_contract.js';
import '../modals/add_value.js';
import '../modals/add_reason.js';
import '../modals/see_details.js';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Regions } from '../../../api/regions/regions';
import { Reports } from '../../../api/reports/reports';


Template.report_details.onCreated(function () {
    Session.get('search', '')
    this.autorun(() => {
        this.subscribe('user', Meteor.userId())
        this.subscribe('contracts.specific', Meteor.user().reportDetails)
        this.subscribe('report', Meteor.user().reportId)
    })    
})

Template.report_details.helpers({
    contracts() {
        if(!Meteor.user()) return FlowRouter.go('/login')
        let filter = Session.get('search') ? Session.get('search') : ''
        let selector = { _id: {$in: Meteor.user().reportDetails} };
        let options = { sort: { createdAt: -1 } }

        if (filter.length > 0) {
            let regexOptions = {
                $regex: filter,
                $options: 'i',
            };
            selector['$or'] = [{
                region: regexOptions,
            }, {
                plate: regexOptions,
            }, {
                renavam: regexOptions,
            }, {
                chassis: regexOptions,
            }, {
                date: regexOptions,
            }, {
                patio: regexOptions,
            }];
            return Contracts.find(selector, options) ? Contracts.find(selector, options).fetch() : []
        } else {
            return Contracts.find(selector, options) ? Contracts.find(selector, options).fetch() : []
        }
    },
    reportDate: () => Reports.findOne({_id: Meteor.user().reportId}) ? Reports.findOne({_id: Meteor.user().reportId}).date : 'Data não encontrada'
});

Template.report_details_item.helpers({
    regionName(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).name : []
    },
    regionPrice(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).price : []
    },
});

Template.report_details_item.events({
    'click .editContract'(event, template) {
        event.preventDefault();
        Session.set('editContractMode', true)
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        const doc = Contracts.findOne({_id: contractId})
        $('.contract_plate').val(doc.plate)
        $('.contract_renavam').val(doc.renavam)
        $('.contract_chassis').val(doc.chassis)
        $('.contract_patio').val(doc.patio)
        $('.contract_value').val(doc.value)
        $('.contract_region').val(doc.region.name)
        $('#add_contract_modal').modal('show');
    },
    'click .addValueToContract'(event, template) {
        event.preventDefault();
        $( ".debitSelected" ).prop( "checked", false );
        $( ".creditSelected" ).prop( "checked", false );
        Session.set('typeOfValueSelected', '')
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        const doc = Contracts.findOne({_id: contractId})
        $('#add_value_modal').modal('show');
    },
    'click .seeContractDetails'(event, template) {
        event.preventDefault();
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        $('#see_details_modal').modal('show');
    },
    'click .arquiveContract'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja arquivar esse contrato?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        Meteor.call('contracts.arquive', contractId)
    },
})
