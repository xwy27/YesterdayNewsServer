const mysql = require('mysql');

const dbConfig = require('../config/database');
const defaultLogger = require('../utils/logger')('default');

const pool = mysql.createPool(dbConfig.mysqlConfig);

let execSQL = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
        connection.release();
      }
    });
  });
};

// Init user table
execSQL(`CREATE TABLE IF NOT EXISTS ${dbConfig.userTable}
         (username VARCHAR(30) NOT NULL,
         password TEXT NOT NULL,
         telephone TEXT,
         avatar TEXT,
         PRIMARY KEY(username))`)
  .then(result => {
    defaultLogger.info(`Successfully create ${dbConfig.userTable} table`);
  })
  .catch(err => {
    defaultLogger.error(err);
  }
);

module.exports = { 
  execSQL: execSQL,
  escape: mysql.escape
};