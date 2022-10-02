var express = require('express');
var router = express.Router();
var auth_mgmt = require('auth_mgmt');

router.post('/', auth_mgmt.validate, auth_mgmt.login);

module.exports = router;
