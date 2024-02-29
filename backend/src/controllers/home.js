const Contact = require('../models/contacts');

module.exports.index = async (req, res, next) => {
    const allContacts = await Contact.findAll();

    res.render('home', { contactList: allContacts });
    return;
}