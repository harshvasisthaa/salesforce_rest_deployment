'use strict';

const sqlite = require('db_conn_mgmt');
const session = require('session_mgmt').session;

const property_file = __dirname+'/properties/property.json';
const prop = require(property_file);

const create_user = (create_properties) => {
	return new Promise((resolve, reject) => {
		create_properties[1] = session.hashString(create_properties[1]);
		let user_prop = {
			username:create_properties[0],
			resolve:resolve,
			reject:reject,
			create_properties:create_properties
		}
		initProcess(user_prop);
    });
}

const initProcess = (user_prop) => {
	validate_username(user_prop);
}

const create_user_row = (user_prop) => {
	sqlite.insert(prop.db,prop.insert.user.table,prop.insert.user.columns, [user_prop.create_properties])
		.then((result)=>{
			if(result.resp.isSuccess){
				user_prop.resolve({isSuccess: true});
			}else{
				user_prop.reject({isSuccess: false, msg: prop.error_msg.insert_fail});
			}
		}).catch((error)=>{
			user_prop.reject({isSuccess: false, msg: prop.error_msg.db_error});
		});
}

const validate_username_exists = (user_prop) => {
	sqlite.query(prop.db,prop.validate_user_query,[user_prop.username])
		.then((result) => {
			if(result.length > 0){
				user_prop.reject({isSuccess: false, msg: prop.error_msg.username_exists});
			}else{
				create_user_row(user_prop);
			}
	}).catch((error) => {
		user_prop.reject({isSuccess: false, msg: prop.error_msg.db_error});
	});
}

const validate_username = (user_prop) => {
	var emailRegEx = /\S+@\S+\.\S+/;
	if(!emailRegEx.test(user_prop.username)){
		user_prop.reject({isSuccess: false, msg: prop.error_msg.invalid_username});
	}else{
		validate_username_exists(user_prop)
	}
}

module.exports = {
    create : create_user
};