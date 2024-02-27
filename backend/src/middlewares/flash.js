exports.alerts = (req, res, next) => {
    res.locals.alerts = {
        email: req.flash('email'),
        password: req.flash('password'),
        repeatPassword: req.flash('repeatPassword'),
        signup: req.flash('signup')
    }

    next();
}

exports.user = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}