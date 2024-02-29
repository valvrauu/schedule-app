exports.authenticateUser = req => {
    return req.session.user;
}