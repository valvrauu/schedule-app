const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: false,
        default: ''
    },
    phone: {
        type: String,
        required: false,
        default: ''
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const ContactModel = mongoose.model('Contacts', ContactSchema);

class ContactClass {
    constructor(body) {
        this.body = body;
        this.errors = {
            name: [],
            lastName: [],
            email: [],
            phone: [],
        };
        this.details = null;
        this.lastDeleted = null;
    }

    async create() {
        await this.validate();

        const searchEmail = await ContactModel.findOne({ email: this.body.email });
        const searchPhone = await ContactModel.findOne({ phone: this.body.phone });
        if (searchEmail && searchEmail.email !== '') this.errors.email.push('Email already exists');
        if (searchPhone && searchPhone.phone !== '') this.errors.phone.push('Phone already exists');

        if (this.hasErrors()) return;

        const contactCreated = await ContactModel.create(this.body);
        if (contactCreated) this.details = contactCreated;
    }

    async updateById(id) {
        await this.validate();
        if (this.hasErrors()) return;

        const contactUpdated = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
        if (contactUpdated) this.details = contactUpdated;
    }

    async deleteById(id) {
        if (!id || !mongoose.isValidObjectId(id)) return;

        const contactDeleted = await ContactModel.findOneAndDelete({ _id: id });
        if (contactDeleted) this.lastDeleted = contactDeleted;
    }

    async validate() {
        this.cleanUp();

        if (!this.body.name) this.errors.name.push('Name field is mandatory');

        if (!this.body.email && !this.body.phone) {
            this.errors.email.push('Email or phone field is mandatory');
            this.errors.phone.push('Email or phone field is mandatory');
            return;
        }

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.email.push('Invalid email');
        if (this.body.phone && !validator.isMobilePhone(this.body.phone)) this.errors.phone.push('Invalid phone');
    }

    static async findById(id) {
        if (!mongoose.isValidObjectId(id)) return;

        const contactFind = await ContactModel.findById(id);
        return contactFind;
    }

    static async findAll() {
        const contactsFound = await ContactModel.find({});
        return contactsFound;
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            name: this.body.cName,
            lastName: this.body.cLastName,
            email: this.body.cEmail.toLowerCase(),
            phone: this.body.cPhone,
        }
    }

    hasErrors() {
        return (
            this.errors.name.length > 0 ||
            this.errors.lastName.length > 0 ||
            this.errors.email.length > 0 ||
            this.errors.phone.length > 0
        );
    }
}

module.exports = ContactClass;