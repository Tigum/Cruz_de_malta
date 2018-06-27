import { Session } from "meteor/session";
import './add_contract.html';
import '../../components/navbar/navbar.js';
import '../../pages/home/home.js';
import '../../components/pre-loader/pre-loader.js';
import { Regions } from '../../../api/regions/regions.js';
import { Patios } from "../../../api/patios/patios";
import moment from "moment";

Template.add_contract.onCreated(function () {
    this.autorun(() => {
        this.subscribe('regions')
        this.subscribe('patios')
    })    
})

Template.add_contract.onDestroyed(function () {
    Session.set('editContractMode', false)
})

Template.add_contract.helpers({
    regions: () => Regions.find() ? Regions.find({}, {sort: {name: 1}}).fetch() : [],
    patios: () => Patios.find() ? Patios.find({}, {sort: {name: 1}}).fetch() : [],
    editMode: () => Session.get('editContractMode') ? Session.get('editContractMode') : false,
});

Template.add_contract.events({
    'click .buttonModalSave'(event, template) {
        if(!$('.contract_plate').val()) return alert('Favor inserir placa')
        if(!$('.contract_region').val() || $('.contract_region').val() == 'not_selected') return alert('Favor inserir região para honorário')
        if(!$('.contract_patio').val() || $('.contract_patio').val() == 'not_selected') return alert('Favor inserir patio')
        if(!$('.contract_renavam').val()) return alert('Favor inserir o renavam')
        
        const selectedRegion = Regions.findOne({name: $('.contract_region').val()}) ? Regions.findOne({name: $('.contract_region').val()}) : {}
        
        if(!selectedRegion) return alert('Favor selecionar região')

        const region = {
            _id: selectedRegion._id,
            name: selectedRegion.name,
            price: selectedRegion.price
        }

        const doc = {
            plate: $('.contract_plate').val().toUpperCase(),
            renavam: $('.contract_renavam').val(),
            chassis: $('.contract_chassis').val() ? $('.contract_chassis').val() : 'Chassis não informado',
            patio: $('.contract_patio').val(),
            value: $('.contract_value').val() ? parseFloat($('.contract_value').val()).toFixed(2) : 0,
            region: region,
            status: 'new',
            date: moment(new Date()).format('DD/MM/YYYY'),
            month: moment(new Date()).format('MM/YYYY')
        }
        Meteor.call('contracts.insert', doc)
        alert('Novo contrato adicionado com sucesso!')
        $('#add_contract_modal').modal('toggle');
        Session.set('editContractMode', false)
        clearAddContractForm()
    },
    'click .buttonModalEdit'(event, template) {
        if(!$('.contract_plate').val()) return alert('Favor inserir placa')
        if(!$('.contract_region').val() || $('.contract_region').val() == 'not_selected') return alert('Favor inserir região para honorário')
        if(!$('.contract_patio').val() || $('.contract_patio').val() == 'not_selected') return alert('Favor inserir patio')
        if(!$('.contract_renavam').val()) return alert('Favor inserir o renavam')
        
        const doc = {
            id: Session.get('contractId'),
            plate: $('.contract_plate').val().toUpperCase(),
            renavam: $('.contract_renavam').val(),
            chassis: $('.contract_chassis').val() ? $('.contract_chassis').val() : 'Chassis não informado',
            patio: $('.contract_patio').val(),
            value: $('.contract_value').val() ? parseFloat($('.contract_value').val()).toFixed(2) : 0,
        }
        Meteor.call('contracts.edit', doc)
        alert('Contrato editado com sucesso!')
        $('#add_contract_modal').modal('toggle');
        Session.set('editContractMode', false)
        clearAddContractForm()
    },
    'click .buttonModalDelete'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja deletar esse contrato permanentemente?');
        if (!result) return;
        Meteor.call('contracts.delete', Session.get('contractId'))
    },
})

function clearAddContractForm() {
    $('.contract_plate').val('')
    $('.contract_renavam').val('')
    $('.contract_chassis').val('')
    $('.contract_patio').val('')
    $('.contract_value').val(0)
    $('.contract_region').val('0')
}