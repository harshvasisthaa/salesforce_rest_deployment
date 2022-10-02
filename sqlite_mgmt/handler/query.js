'use strict';

const query_db = (database, sql_query, params) => {
    return new Promise((resolve, reject) => {
        const data_row = [];
        database.each(sql_query, params,(err, row) => {
            if (err) {
                reject(err);
            }
			data_row.push(row);
        }, (err, n) => {
            if (err) {
                reject(err);
            }
			resolve(data_row);
        });
    });
}

module.exports = {
    query : query_db
};