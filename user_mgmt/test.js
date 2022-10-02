const createUser = require('./handler/create');
const loginUser = require('./handler/login');

/*createUser.create(['harsh@rawat.com','asdasdasd'])
.then((result) => {
    console.log("Success", result);
})
.catch((error) => {
    console.log("Error", error);
})
/*
loginUser.validate('saK4oxyOfwBTO4aUCUlHuNVEJkINfF9ZJhtbrG2F6nQ=', 'harsh@rawat.com')
.then((result) => {
    console.log("Success", result);
})
.catch((error) => {
    console.log("Error", error);
})
/*/
loginUser.login('harsh@rawat.com','asdasdasd')
.then((result) => {
    console.log("Success", result);
})
.catch((error) => {
    console.log("Error", error);
})

/*const conn = require('db_conn_mgmt').connect;
const sql = require('db_conn_mgmt').query;
const session = require('session_mgmt').session;


var connection = conn.connect('C:/Users/Harsh Rawat/Desktop/Node Projects/school_mgmt/user.db');
console.log(connection.isConnected);
console.log(session.creataSession());

var insertResp = dmls.insert(connection.db,'USER',['username','password'],[['ac@cb.com','mopqer'],['ac@cbs.com','mopqer']]);
insertResp.then((result) => {
    console.log("Success------------", result);
}).catch((error) => {
    console.log("Error", error);
})

dmls.update(connection.db,'Update User set password = ? WHERE username = ?', ['123456', 'ac@cb.com'])
.then((result) => {
    console.log("Success", result);
})
.catch((error) => {
    console.log("Error", error);
})

var queryResp = sql.query(connection.db, 'SELECT * FROM USER',[]);

queryResp.then((result) => {
    console.log("Success", result);
}).catch((error) => {
    console.log("Error", error);
})


if(connection.isConnected){
	conn.clsoe(connection.db);
}*/