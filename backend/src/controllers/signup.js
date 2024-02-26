const { SignUpClass } = require('../models/signup');

module.exports.index = (req, res, next) => {
    res.render('signup');
    return;
}

module.exports.submit = async (req, res, next) => {
    try {
        const signup = new SignUpClass(req.body);
        await signup.create();

        const { errors } = signup;

        if (Object.values(errors).every(prop => prop.length === 0)) { 
            req.flash('signup', 'Success, account created!');
        } else {
            if (errors.email.length > 0) req.flash('email', errors.email);
            if (errors.password.length > 0) req.flash('password', errors.password);
            if (errors.repeatPassword.length > 0) req.flash('repeatPassword', errors.repeatPassword);
        }

        res.redirect('/signup');
        return;
    } catch (e) {
        console.error(e);
    }
}