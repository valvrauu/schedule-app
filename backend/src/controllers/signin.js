const { SignInClass } = require('../models/signin');
const handleFormErrors = require('../utils/handleFormErrors');

module.exports.index = (req, res, next) => {
    if(req.session.user) {
        res.redirect('/');
        return;
    }

    res.render('signin');
    return;
}

module.exports.submit = async (req, res, next) => {
    try {
        const signin = new SignInClass(req.body);
        await signin.enter();

        if(!handleFormErrors(signin.errors, req)) {
            req.flash('signin', 'Sucess, logged into the account!')
            req.session.user = signin.user;
        }

        res.redirect('/signin');
        return;
    } catch (e) {
        console.error(e);
    }
}

module.exports.leave = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
    return;
}