const express = require('express');
const router = express.Router();

const { index } = require('../controllers/home');

router.route('/').get(index);

module.exports = router;