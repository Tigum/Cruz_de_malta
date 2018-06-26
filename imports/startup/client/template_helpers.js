import { Template } from 'meteor/templating';

Template.registerHelper("formatPrice", function formatPrice(price) {
    return price ? 'R$' + price.toFixed(2) : 'Price formatting not working';
});
