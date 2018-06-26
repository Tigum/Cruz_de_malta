import './regions.html';
import '../../pages/modals/add_region.js'
import { Session } from "meteor/session";
import { Regions } from '../../../api/regions/regions.js';

Template.regions.onCreated(function () {
    this.subscribe("regions")
})

Template.regions.helpers({
    regions: () => Regions.find() ? Regions.find({}, {sort: {name: 1}}).fetch() : [],
});

Template.regions.events({
    'click .editRegion'(event, template) {
        event.preventDefault();
        Session.set('editRegionMode', true)
        const clickedItem = $(event.currentTarget);
        const regionId = clickedItem.attr('data-region-id')
        Session.set('regionId', regionId)
        const doc = Regions.findOne({_id: regionId})
        $('.region-input').val(doc.name)
        $('.region_price').val(doc.price)
        $('#add_region_modal').modal('show'); 
    },
    'click .deleteRegion'(event, template) {
        event.preventDefault();
        const clickedItem = $(event.currentTarget);
        const regionId = clickedItem.attr('data-region-id')
        const result = window.confirm('Tem certeza que deseja deletar essa região?');
        if (!result) return;
        Meteor.call('regions.delete', regionId)
    },
})