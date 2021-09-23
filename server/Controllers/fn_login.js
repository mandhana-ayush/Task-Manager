const express = require('express');
const router = express.Router();

const {createUser, getUser, getAllValue} = require('../Tasks/task_login');

router.route('/register').post(createUser);
router.route('/login').get(getUser);

router.route('/db/value/list/final').get(getAllValue);

module.exports = router;
