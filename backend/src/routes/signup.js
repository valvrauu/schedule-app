const express = require('express');
const router = express.Router();

const { index, submit } = require('../controllers/signup');

router.route('/signup').get(index);
router.route('/signup/submit').post(submit);

module.exports = router;