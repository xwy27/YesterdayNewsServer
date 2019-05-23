const mysql = require('mysql');

const dbConfig = require('../config/database');
const defaultLogger = require('../utils/logger')('default');

const pool = mysql.createPool(dbConfig.mysqlConfig);

const CREATE_USEER_TABLE = 
  `CREATE TABLE IF NOT EXISTS ${dbConfig.userTable}
  (username VARCHAR(30) NOT NULL,
  password TEXT NOT NULL,
  telephone TEXT,
  avatar TEXT,
  PRIMARY KEY(username))
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_NEWS_TABLE = 
  `CREATE TABLE IF NOT EXISTS ${dbConfig.newsTable}
  (group_id VARCHAR(30) NOT NULL,
  title TEXT NOT NULL,
  time TEXT NOT NULL,
  author TEXT NOT NULL,
  image_infos JSON,
  content TEXT,
  comments INT DEFAULT 0,
  PRIMARY KEY(group_id))
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_COMMENTS_TABLE = 
`CREATE TABLE IF NOT EXISTS ${dbConfig.commentTable}
  (ID INT UNSIGNED AUTO_INCREMENT,
  userID VARCHAR(30) NOT NULL,
  newsID VARCHAR(30) NOT NULL,
  time TEXT NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(userID) REFERENCES ${dbConfig.userTable}(username),
  FOREIGN KEY(newsID) REFERENCES ${dbConfig.newsTable}(group_id))
  ENGINE=InnoDB CHARSET=utf8mb4;`;


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
execSQL(CREATE_NEWS_TABLE)
  .then(result => {
    defaultLogger.info(`Successfully create ${dbConfig.newsTable} table`);
    return execSQL(CREATE_USEER_TABLE);
  })
  .then(result => {
    defaultLogger.info(`Successfully create ${dbConfig.userTable} table`);
    return execSQL(CREATE_USEER_TABLE);
  })
  .then(result => {
    defaultLogger.info(`Successfully create ${dbConfig.commentTable} table`);
  })
  .catch(err => {
    defaultLogger.error(err);
  });

module.exports = { 
  execSQL: execSQL,
  escape: mysql.escape
};