const mysql = require('mysql');

const dbConfig = require('../config/database');
const table = dbConfig.table;
const dbLogger = require('../utils/logger')('dbLogger');

const pool = mysql.createPool(dbConfig.mysqlConfig);

const CREATE_USEER_TABLE = 
  `CREATE TABLE IF NOT EXISTS ${table.user}
  (username VARCHAR(30) BINARY NOT NULL,
  password TEXT NOT NULL,
  telephone TEXT,
  avatar TEXT,
  PRIMARY KEY(username))
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_NEWS_TABLE = 
  `CREATE TABLE IF NOT EXISTS ${table.news}
  (group_id VARCHAR(30) BINARY NOT NULL,
  title TEXT NOT NULL,
  time TEXT NOT NULL,
  author TEXT NOT NULL,
  image_infos JSON,
  content TEXT,
  comments INT DEFAULT 0,
  PRIMARY KEY(group_id))
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_COMMENTS_TABLE = 
`CREATE TABLE IF NOT EXISTS ${table.comment}
  (commentID INT UNSIGNED AUTO_INCREMENT,
  userID VARCHAR(30) BINARY NOT NULL,
  newsID VARCHAR(30) BINARY NOT NULL,
  stars INT DEFAULT 0,
  time TEXT NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY(commentID),
  FOREIGN KEY(userID) REFERENCES ${table.user}(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(newsID) REFERENCES ${table.news}(group_id) ON DELETE CASCADE ON UPDATE CASCADE)
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_STAR_TABLE = 
`CREATE TABLE IF NOT EXISTS ${table.star}
  (starID INT UNSIGNED AUTO_INCREMENT,
  commentID INT UNSIGNED NOT NULL,
  userID VARCHAR(30) BINARY NOT NULL,
  PRIMARY KEY(starID),
  FOREIGN KEY(userID) REFERENCES ${table.user}(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(commentID) REFERENCES ${table.comment}(commentID) ON DELETE CASCADE ON UPDATE CASCADE)
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_HISTORY_TABLE = 
`CREATE TABLE IF NOT EXISTS ${table.history}
  (historyID INT UNSIGNED AUTO_INCREMENT,
  newsID VARCHAR(30) BINARY NOT NULL,
  userID VARCHAR(30) BINARY NOT NULL,
  PRIMARY KEY(historyID),
  FOREIGN KEY(userID) REFERENCES ${table.user}(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(newsID) REFERENCES ${table.news}(group_id) ON DELETE CASCADE ON UPDATE CASCADE)
  ENGINE=InnoDB CHARSET=utf8mb4;`;
const CREATE_COLLECTION_TABLE = 
`CREATE TABLE IF NOT EXISTS ${table.collection}
  (collectionID INT UNSIGNED AUTO_INCREMENT,
  newsID VARCHAR(30) BINARY NOT NULL,
  userID VARCHAR(30) BINARY NOT NULL,
  PRIMARY KEY(collectionID),
  FOREIGN KEY(userID) REFERENCES ${table.user}(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(newsID) REFERENCES ${table.news}(group_id) ON DELETE CASCADE ON UPDATE CASCADE)
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
    dbLogger.info(`Successfully create ${table.news} table`);
    return execSQL(CREATE_USEER_TABLE);
  })
  .then(result => {
    dbLogger.info(`Successfully create ${table.user} table`);
    return execSQL(CREATE_COMMENTS_TABLE);
  })
  .then(result => {
    dbLogger.info(`Successfully create ${table.comment} table`);
    return execSQL(CREATE_STAR_TABLE);
  })
  .then(result => {
    dbLogger.info(`Successfully create ${table.star} table`);
    return execSQL(CREATE_COLLECTION_TABLE);
  })
  .then(result => {
    dbLogger.info(`Successfully create ${table.collection} table`);
    return execSQL(CREATE_HISTORY_TABLE);
  })
  .then(result => {
    dbLogger.info(`Successfully create ${table.history} table`);
  })
  .catch(err => {
    dbLogger.error(err);
  });

module.exports = { 
  execSQL: execSQL,
  escape: mysql.escape
};