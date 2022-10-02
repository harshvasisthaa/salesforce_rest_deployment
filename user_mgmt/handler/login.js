'use strict';

const sqlite = require('db_conn_mgmt');
const session = require('session_mgmt').session;

const property_file = __dirname+'/properties/property.json';
const prop = require(property_file);

const user_login = (username, password) => {
	return new Promise((resolve, reject) => {
		let user_prop = {
			username:username,
			password:session.hashString(password),
			resolve:resolve,
			reject:reject
		}
		initProcess(user_prop);
    });
}

const validate_session = (session_key, username) => {
	return new Promise((resolve, reject) => {
		let user_prop = {
			session_key:session_key,
			username:username,
			resolve:resolve,
			reject:reject
		}
		validate_session_query(user_prop);
    });
}

const initProcess = (user_prop) => {
	validate_username_password(user_prop);
}

const update_user_session = (user_prop, session) => {
	sqlite.insert(prop.db,prop.insert.session.table,prop.insert.session.columns, [[session.key, sqlite.dbDateTime(session.generatedOn), user_prop.user_id]])
		.then((result)=>{
			if(result.resp.isSuccess){
				user_prop.resolve({isSuccess: true, session_key: session.key, session_type: 'mgmt'});
			}else{
				user_prop.reject({isSuccess: false, msg: prop.error_msg.login_fail});
			}
		}).catch((error)=>{
			user_prop.reject({isSuccess: false, msg: prop.error_msg.db_error});
		});
}

const validate_username_password = (user_prop) => {
	sqlite.query(prop.db,prop.validate_user_login,[user_prop.username, user_prop.password])
		.then((result) => {
			if(result.length == 1){
				user_prop.user_id = result[0].user_id;
				let user_session = session.creataSession();
				update_user_session(user_prop,user_session)
			}else{
				user_prop.reject({isSuccess: false, msg: prop.error_msg.login_fail});
			}
	}).catch((error) => {
		user_prop.reject({isSuccess: false, msg: prop.error_msg.db_error});
	});
}

const validate_session_query = (user_prop) => {
	sqlite.query(prop.db,prop.validate_user_session,[user_prop.session_key, user_prop.username])
		.then((result) => {
			if(result.length == 1){
				if(session.isValid(result[0].timestamp)){
					user_prop.resolve({isSuccess: true});
				}else{
					user_prop.reject({isSuccess: false, msg: prop.error_msg.session_expired});
				}
			}else{
				user_prop.reject({isSuccess: false, msg: prop.error_msg.session_expired});
			}
	}).catch((error) => {
		user_prop.reject({isSuccess: false, msg: prop.error_msg.db_error});
	});
}

module.exports = {
    login : user_login,
	validate : validate_session
};