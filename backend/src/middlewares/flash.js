exports.alerts = (req, res, next) => {
    res.locals.alerts = {
        email: req.flash('email'),
        password: req.flash('password'),
        repeatPassword: req.flash('repeatPassword'),
        signup: req.flash('signup'),
        contact: {
            name: req.flash('cName'),
            lastName: req.flash('cLastName'),
            email: req.flash('cEmail'),
            phone: req.flash('cPhone'),
            status: req.flash('cStatus'),
        }
    }

    next();
}

exports.user = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}