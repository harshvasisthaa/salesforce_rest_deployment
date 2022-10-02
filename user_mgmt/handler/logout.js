'use strict';

const sqlite = require('db_conn_mgmt');
const session = require('session_mgmt').session;

const property_file = __dirname+'/properties/property.json';
const prop = require(property_file);

const user_logout = (username, session) => {
	return new Promise((resolve, reject) => {
		sqlite.update(prop.db,prop.insert.session.table,prop.insert.session.columns, [[session.key, sqlite.dbDateTime(session.generatedOn), user_prop.user_id]])
		.then((result)=>{
			if(result.resp.isSuccess){
				user_prop.resolve({isSuccess: true, session_key: session.key});
			}else{
				user_prop.reject({isSuccess: false, msg: prop.error_msg.login_fail});
			}
		}).catch((error)=>{
			user_prop.reject({isSuccess: false, msg: prop.error_msg.db_error});
		});
    });
}

module.exports = {
    logout : user_logout
};