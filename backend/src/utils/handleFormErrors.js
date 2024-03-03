module.exports = (errors, req) => {
    let hasErrors = Object.values(errors).some(err => err.length > 0);

    if (hasErrors) {
        const { email, password, repeatPassword, name, lastName, phone } = errors;

        email && email.length > 0 ? req.flash('email', email) && req.flash('cEmail', email) : '';
        password && password.length > 0 ? req.flash('password', password) : '';
        repeatPassword && repeatPassword.length > 0 ? req.flash('repeatPassword', repeatPassword) : '';
        name && name.length > 0 ? req.flash('cName', name) : '';
        lastName && lastName.length > 0 ? req.flash('cLastName', lastName) : '';
        phone && phone.length > 0 ? req.flash('cPhone', phone) : '';
    }

    return hasErrors;
}