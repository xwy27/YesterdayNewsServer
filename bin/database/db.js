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

// Init news table
execSQL(`CREATE TABLE IF NOT EXISTS ${dbConfig.newsTable}
         (group_id TEXT NOT NULL,
         title TEXT NOT NULL,
         time INTEGER NOT NULL,
         author TEXT NOT NULL,
         image_infos JSON,
         content TEXT,
         comments INT DEFAULT 0,
         PRIMARY KEY(group_id))`)
  .then(result => {
    defaultLogger.info(`Successfully create ${dbConfig.newsTable} table`);
  })
  .catch(err => {
    defaultLogger.error(err);
  }
);

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

// Init comments table
execSQL(`CREATE TABLE IF NOT EXISTS ${dbConfig.commentTable}
         (ID INT UNSIGNED AUTO_INCREMENT,
         userID TEXT NOT NULL,
         newsID TEXT NOT NULL,
         content TEXT NOT NULL,
         PRIMARY KEY(ID)
         FOREIGN KEY(userID) REFERENCE ${dbConfig.userTable}(username)
         FOREIGN KEY(newsID) REFERENCE ${dbConfig.newsTable}(group_id))`)
  .then(result => {
    defaultLogger.info(`Successfully create ${dbConfig.commentTable} table`);
  })
  .catch(err => {
    defaultLogger.error(err);
  }
);

module.exports = { 
  execSQL: execSQL,
  escape: mysql.escape
};