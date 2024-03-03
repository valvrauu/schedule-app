const { SignUpClass } = require('../models/signup');
const handleFormErrors = require('../utils/handleFormErrors');

module.exports.index = (req, res, next) => {
    if(req.session.user) {
        res.redirect('/');
        return;
    }

    res.render('signup');
    return;
}

module.exports.submit = async (req, res, next) => {
    try {
        const signup = new SignUpClass(req.body);
        await signup.create();

        if(!handleFormErrors(signup.errors, req)) {
            req.flash('signup', 'Success, account created!');
        }

        res.redirect('/signup');
        return;
    } catch (e) {
        console.error(e);
    }
}