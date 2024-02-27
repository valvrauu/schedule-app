const { SignInClass } = require('../models/signin');

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

        const { errors } = signin;

        if (Object.values(errors).every(prop => prop.length === 0)) {
            req.flash('signin', 'Sucess, logged into the account!')
            req.session.user = signin.user;
        } else {
            if(errors.email.length > 0) req.flash('email', errors.email);
            if (errors.password.length > 0) req.flash('password', errors.password);
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