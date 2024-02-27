const bcryptjs = require('bcryptjs');
const { SignUpModel } = require('./signup');

class SignInClass {
    constructor(body) {
        this.body = body;
        this.errors = {
            email: [],
            password: []
        };
        this.user = null;
    }

    async enter() {
        await this.findEmail();
        if(!this.user) return this.errors.email.push('Email does not exist');

        this.comparePassword();
        if(!this.user) return this.errors.password.push('Password does not match');
    }

    async findEmail() {
        const user = await SignUpModel.findOne({ email: this.body.email });
        this.user = user;
    }

    comparePassword() {
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.user = null;
        }
    }
}

module.exports = { SignInClass };