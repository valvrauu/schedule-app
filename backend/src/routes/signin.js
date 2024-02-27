const express = require('express');
const router = express.Router();

const { index, submit, leave } = require('../controllers/signin');

router.route('/signin').get(index);
router.route('/signin/submit').post(submit);
router.route('/signin/leave').get(leave);

module.exports = router;