const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const signUpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const SignUpModel = mongoose.model('Users', signUpSchema);

class SignUpClass {
    constructor(body) {
        this.body = body;
        this.errors = {
            email: [],
            password: [],
            repeatPassword: []
        };
        this.user = null;
    }

    async create() {
        this.validate();
        await this.checkUser();

        if (this.hasErrors()) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await SignUpModel.create({
            email: this.body.email,
            password: this.body.password
        });
    }

    async checkUser() {
        this.user = await SignUpModel.findOne({ email: this.body.email });

        if(this.user) {
            this.errors.email.push('E-mail already registered');
        }
    }

    validate() {
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) {
            this.errors.email.push('Invalid email');
        }

        if(!validator.isStrongPassword(this.body.password)) {
            this.errors.password.push('Password is not strong');
        }

        if(this.body.password.length < 8 || this.body.password.length > 20) {
            this.errors.password.push('Password must be between 8 and 20 characters');
        }

        if(this.body.password !== this.body.repeatPassword) {
            this.errors.repeatPassword.push('Password and repeat password are different');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            email: this.body.email.toLowerCase(),
            password: this.body.password,
            repeatPassword: this.body.repeatPassword
        }
    }

    hasErrors() {
        return (
            this.errors.email.length > 0 ||
            this.errors.password.length > 0 ||
            this.errors.repeatPassword.length > 0
        );
    }
}

module.exports = { signUpSchema, SignUpModel, SignUpClass };