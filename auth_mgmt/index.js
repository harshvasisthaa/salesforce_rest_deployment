'use strict';

const handler = require(`${__dirname}/handler/handler.js`);
module.exports = {
	logout: handler.logout,
	validate: handler.validate,
	login: handler.login
};