'use strict';

const sqlite3 = require('sqlite3').verbose();

const connect_db = (databse) => {
	return new Promise((resolve, reject) => {
		let error_msg = null;
		let db = new sqlite3.Database(databse, (err) => {
			if(err){
				reject({isConnected: false, db: null, msg: err.code});
			}else{
				resolve({isConnected: true, db: db});
			}
		});		
    });
	
}

const close_db = (databse) => {
	try {
		databse.close(databse);
		return {isClosed : true}
	} catch (ex) {
		return {isClosed : false, msg:ex.message}
	}
}

module.exports = {
    connect : connect_db,
    clsoe : close_db
};