import { Session } from "meteor/session";
import './add_report.html';
import '../../components/navbar/navbar.js';

Template.add_report.onDestroyed(function () {
    
})

Template.add_report.events({
    // 'click .buttonModalSave'(event, template) {
    //     const doc = {
    //         name: slugify($('.region-input').val(), {remove: '-'}),
    //         price: parseFloat($('.region_price').val()).toFixed(2)
    //     }

    //     if(Regions.findOne({name: doc.name})) {
    //         $('.region-input').val('')
    //         $('.region_price').val('')
    //         return alert('Esta região já existe. Favor adicionar uma região diferente.')
    //     }

    //     Meteor.call('regions.insert', doc)
    //     alert('Região adicionada com sucesso!')
    //     $('#add_region_modal').modal('toggle');
    // },
    // 'click .buttonModalEdit'(event, template) {
    //     const doc = {
    //         id: Session.get('regionId') ? Session.get('regionId') : '',
    //         name: $('.region-input').val(),
    //         price: parseFloat($('.region_price').val()).toFixed(2)
    //     }
    //     Meteor.call('regions.edit', doc)
    //     alert('Região editada com sucesso!')
    //     Session.set('editRegionMode', false)
    //     $('#add_region_modal').modal('toggle');
    // },
})

Template.add_report.helpers({
    // editMode: () => Session.get('editRegionMode') ? Session.get('editRegionMode') : false,
});