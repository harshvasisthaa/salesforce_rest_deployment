var express = require('express');
var router = express.Router();
var auth_mgmt = require('auth_mgmt');
var shell_exec = require('shell_exec');

/* GET users listing. */
router.post('/', auth_mgmt.validate, function(req, res, next) {
	shell_exec.deploy(req.body);
	res.statusCode = 202;
	res.send("Deployment has been enqued");
});

module.exports = router;
