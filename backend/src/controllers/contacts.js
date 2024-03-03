const Contact = require('../models/contacts');
const { authenticateUser } = require('../middlewares/user');
const handleFormErrors = require('../utils/handleFormErrors');

exports.index = (req, res) => {
    try {
        if(!authenticateUser(req)) return res.redirect('/');

        res.render('contacts', { contact: {} });
    } catch (e) {
        console.log(e);
    }
}

exports.create = async (req, res) => {
    try {
        if(!authenticateUser(req)) return res.redirect('/');

        const contact = new Contact(req.body);
        await contact.create();

        if (!contact.details) {
            handleFormErrors(contact.errors, req);
            res.redirect('/contacts');
            return;
        }

        req.flash('cStatus', 'Contact created successfully!');
        res.redirect(`/contacts`);
    } catch (e) {
        console.error(e);
    }
}

exports.updateIndex = async (req, res) => {
    try {
        if(!authenticateUser(req)) return res.redirect('/');

        const reqID = req.params.id;
        const contactFind = await Contact.findById(reqID);

        if (!contactFind) return res.redirect('/contacts');
        res.render('contacts', { contact: contactFind });
    } catch (e) {
        console.error(e);
    }
}

exports.update = async (req, res) => {
    try {
        if(!authenticateUser(req)) return res.redirect('/');

        const reqID = req.params.id;
        const contact = new Contact(req.body);
        await contact.updateById(reqID);

        if (!contact.details) {
            handleFormErrors(contact.errors, req);
            res.redirect(`/contacts/update/${reqID}`);
            return;
        }

        const contactID = contact.details._id;

        req.flash('cStatus', 'Contact updated successfully!');
        res.redirect(`/contacts/update/${contactID}`);
    } catch (e) {
        console.error(e);
    }
}

exports.exclude = async (req, res) => {
    try {
        if(!authenticateUser(req)) return res.redirect('/');

        const reqID = req.params.id;
        const contact = new Contact(req.body);
        await contact.deleteById(reqID);

        res.redirect('/');
    } catch (e) {
        console.error(e);
    }
}