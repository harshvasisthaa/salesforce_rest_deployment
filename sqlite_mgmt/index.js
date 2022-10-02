'use strict';

const conn = require('./handler/connection');
const sql = require('./handler/query');
const dmls = require('./handler/dmls')

const query = (db_name, query, properties) => {
	return new Promise((resolve, reject) => {
		conn.connect(db_name)
			.then((result) => {
				if(result.isConnected){
					sql.query(result.db, query,properties)
						.then((query_result) => {
							resolve(query_result);
						}).catch((query_error) => {
							reject(query_error);
						});
				}
			}).catch((error) => {
				reject(error)
			});
	});
}

const insert = (db_name, table, fields, values) => {
	return new Promise((resolve, reject) => {
		conn.connect(db_name)
			.then((result) => {
				if(result.isConnected){
					dmls.insert(result.db, table, fields, values)
						.then((insert_result) => {
							resolve(insert_result);
						}).catch((insert_error) => {
							reject(insert_error);
						});
				}
			}).catch((error) => {
				reject(error)
			});
	});
}

const update = (db_name, statement, values) => {
	return new Promise((resolve, reject) => {
		conn.connect(db_name)
			.then((result) => {
				if(result.isConnected){
					dmls.update(result.db, statement, values)
						.then((update_result) => {
							resolve(update_result);
						}).catch((update_error) => {
							reject(update_error);
						});
				}
			}).catch((error) => {
				reject(error)
			});
	});
}

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

const createDBDate = (dateValue) => {
	return dateValue.getFullYear() + "-" + twoDigits(1 + dateValue.getMonth()) + "-" + twoDigits(dateValue.getDate()) + " " + twoDigits(dateValue.getHours()) + ":" + twoDigits(dateValue.getMinutes()) + ":" + twoDigits(dateValue.getSeconds());
}

module.exports = {
	query : query,
	insert : insert,
	update : update,
	dbDateTime: createDBDate
};