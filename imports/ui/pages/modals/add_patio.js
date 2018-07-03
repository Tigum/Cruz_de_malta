import './add_patio.html';
import '../patios/patios.js';
import '../../components/navbar/navbar';
import { Patios } from '../../../api/patios/patios';

Template.add_patio.onCreated(function () {
    this.autorun(() => {
        if(FlowRouter.getRouteName() ==  'patios'){
        this.subscribe('patios')
        }
    })
})

Template.add_patio.helpers({
    editMode: () => Session.get('patioEdit')
})

Template.add_patio.events({
    'click .buttonModalSave'(event, template) {
        event.preventDefault();

        if(Patios.findOne({name: $('.patio-input').val()})) return alert('Pátio já adicionado ao banco de dados. Favor adicionar outro.')

        if(Session.get('patioEdit') == true){
            const doc = {
                id: Session.get('patioId'),
                name: $('.patio-input').val(),
            }
            Meteor.call('patios.edit', doc)
            alert('Pátio editado com sucesso')
        }else{
            const doc = {
                name: $('.patio-input').val(),
                createdAt: new Date(),
            }
            Meteor.call('patios.insert', doc)
            alert('Pátio adicionado com sucesso')
        }
            
        
        $('.patio-input').val('')
        $('#add_patio_modal').modal('toggle');
    },
})