const express = require('express');
const router = express.Router();

const { index, create, updateIndex, update, exclude } = require('../controllers/contacts');

router.route('/contacts').get(index);
router.route('/contacts/create').post(create);

router.route('/contacts/update/:id').get(updateIndex);
router.route('/contacts/update/:id').post(update);

router.route('/contacts/delete/:id').get(exclude);

module.exports = router;