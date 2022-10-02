'use strict';

const insert_rows = (database, table, fields, values) => {
    return new Promise((resolve, reject) => {
		database.serialize(function() {
			try{
				let response = {};
				let fieldPlaceholder = fields.map((field) => '?').join(',');
				let stmt = database.prepare(`INSERT INTO ${table}(${fields.join(',')}) VALUES (${fieldPlaceholder})`);
				for(let i in values){
					stmt.run(values[i], (err, row) => {
						if (err) {
							response[i] = {isSuccess: false, msg: err.message};
						}else{
							response[i] = {isSuccess: true};
						}
					});
				}
				stmt.finalize(() => {
					resolve({resp:{isSuccess : true, data: response} });
				});
			}catch(ex){
				reject({isSuccess: false, msg: ex.message});
			}
		});
    });
}

const update_rows = (database, statement, values) => {
    return new Promise((resolve, reject) => {
        database.run(statement, values,(err, row) => {
			if (err) {
				reject({isSuccess: false, msg: err.message});
			}
			resolve({isSuccess: true});
		});
    });
}

module.exports = {
    insert : insert_rows,
	update : update_rows
};