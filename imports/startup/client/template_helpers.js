import { Template } from 'meteor/templating';
import moment from "moment";

Template.registerHelper("formatPrice", function formatPrice(price) {
    return price ? 'R$' + price.toFixed(2) : 'Price formatting not working';
});

Template.registerHelper("formatNegativePrice", function formatNegativePrice(price) {
    if(!price) return
    return price < 0 ? '-R$' + parseFloat(price).toFixed(2)*(-1) : 'R$' + parseFloat(price).toFixed(2);
});

Template.registerHelper("formatDate", function formatDate(date) {
    return date ? moment(date).format('DD/MM/YYYY') : 'Date formatting not working';
});

Template.registerHelper("cutString", function cutString(string) {
    return string ? string.substring(0,5) : 'Cut string not working';
});

Template.registerHelper("countContracts", function countContracts(contractsArray) {
    if(!contractsArray) return

    if(contractsArray.length == 1 || contractsArray.length == 0) {
        return contractsArray ? contractsArray.length + ' contrato' : 'Contract count not working';
    }else{
        return contractsArray ? contractsArray.length + ' contratos' : 'Contract count not working';
    }
    
});

