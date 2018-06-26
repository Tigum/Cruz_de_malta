import { Session } from "meteor/session";
import './add_region.html';
import '../regions/regions.js';
import '../../components/navbar/navbar.js';
import { Regions } from "../../../api/regions/regions";
import slugify from "slugify"

Template.add_region.onDestroyed(function () {
    Session.set('editRegionMode', false)
})

Template.add_region.events({
    'click .buttonModalSave'(event, template) {
        const doc = {
            name: slugify($('.region-input').val(), {remove: '-'}),
            price: parseFloat($('.region_price').val()).toFixed(2)
        }

        if(Regions.findOne({name: doc.name})) {
            $('.region-input').val('')
            $('.region_price').val('')
            return alert('Esta região já existe. Favor adicionar uma região diferente.')
        }

        Meteor.call('regions.insert', doc)
        alert('Região adicionada com sucesso!')
        $('#add_region_modal').modal('toggle');
    },
    'click .buttonModalEdit'(event, template) {
        const doc = {
            id: Session.get('regionId') ? Session.get('regionId') : '',
            name: $('.region-input').val(),
            price: parseFloat($('.region_price').val()).toFixed(2)
        }
        Meteor.call('regions.edit', doc)
        alert('Região editada com sucesso!')
        Session.set('editRegionMode', false)
        $('#add_region_modal').modal('toggle');
    },
})

Template.add_region.helpers({
    editMode: () => Session.get('editRegionMode') ? Session.get('editRegionMode') : false,
});