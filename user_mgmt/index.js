'use strict';

const createUser = require('./handler/create');
const loginUser = require('./handler/login');
module.exports = {
	create: createUser.create,
	validate: loginUser.validate,
	login: loginUser.login
};