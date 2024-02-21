exports.checkError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        res.render('404');
        return;
    }
};

exports.generateToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};