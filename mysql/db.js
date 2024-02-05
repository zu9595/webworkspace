const mysql = require('mysql');
//const sql = require('./db/customerSql.js');
const usql = require('./db/t_userSql.js');
// sql.customerList

console.table(process.env);
const connectionPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
    connectionLimit: process.env.MYSQL_CONNECT_LIMIT,
    debug : true
});

const executeQuery = async (alias, values) => {
    return new Promise((resolve, reject) => {
        let executeSql = usql[alias];
        connectionPool.query(executeSql, values, (err, results) => { // values : 속성값들
            if (err) {
                console.log(err);
                reject({ err });
            } else {
                console.log(results);
                resolve(results);
            };
        });
    });
};

module.exports = {
    executeQuery
}