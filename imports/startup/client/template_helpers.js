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