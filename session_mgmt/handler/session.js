'use strict';

const crypto = require('crypto');

const property_file = __dirname+'/properties/properties.json';
const prop = require(property_file);

const create_session = () => {
	let key = generateSessionKey();
	return {'key' : key, generatedOn : new Date()};
}

const generateSessionKey = () => {
	return crypto.randomBytes(prop.key_byte_size).toString(prop.key_string_format);
}

const validate_session = (session_date) => {
	var sessiondate = new Date(session_date);
	sessiondate = new Date(sessiondate.getTime() + prop.validTime*60000);
	if(sessiondate > new Date()){
		return true;
	}
	return false;
}

const create_hash = (normal_string) => {
	return crypto.createHash(prop.algorith)
					.update(normal_string, prop.encoding_type)
					.digest(prop.format);
}

module.exports = {
    creataSession : create_session,
    isValid : validate_session,
	hashString: create_hash
};