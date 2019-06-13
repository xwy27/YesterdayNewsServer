const db = require('./db');
const table = require('../config/database').table;
const syncFunc = require('../utils/customSync');
const dbLogger = require('../utils/logger')('dbLogger');

/**
 * Add a collection into database
 * @param {string} userID user who collects news
 * @param {string} newsID collected news
 * @return {Array} [err, insert_collection_id]
 */
async function addCollection(userID, newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${table.collection} (userID, newsID)
    VALUES(${db.escape(userID)}, ${db.escape(newsID)})`
  ));
  
  if (err) {
    dbLogger.error(`Error to add collection, user:${userID}, news:${newsID},  error message:${err}`);
    return [err, null];
  }

  dbLogger.info(`Add history, user:${userID}, news:${newsID}`);
  return [null, rows.insertId];
}

/**
 * Remove a collection from database
 * @param {string} userID user who collects news
 * @param {string} newsID collected news
 * @return {Array} [err, status]
 */
async function removeCollection(userID, newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${table.collection}
    WHERE BINARY userID=${db.escape(userID)} AND BINARY newsID=${db.escape(newsID)}`
  ));
  
  if (err) {
    dbLogger.error(`Error to remove collection, user:${userID}, news:${newsID},  error message:${err}`);
    return [err, false];
  }

  dbLogger.info(`Remove collection, user:${userID}, news:${newsID}`);
  return [null, true];
}

/**
 * Return collection news list for user
 * @param {string} username user who collects news
 * @return {array} collection news list for user if there exists
 */
async function getUserCollection(username) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT a.group_id, a.title, a.author, a.time, a.comments, ifnull(b.stars, 0) AS stars
    FROM (SELECT n.group_id, n.title, n.author, n.time, n.comments
          FROM ${table.news} n, ${table.collection} c
          WHERE BINARY c.userID = ${db.escape(username)} AND BINARY c.newsID = n.group_id
          ORDER BY n.time) AS a LEFT JOIN
         (SELECT newsID, COUNT(*) AS stars
          FROM ${table.collection} c1
          GROUP BY c1.newsID) AS b
    ON a.group_id = b.newsID`
  ));
  
  if (err) {
    dbLogger.error(`Error to get collection list for user:${username}, error message:${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get collection list for user:${username}`);
  return [null, rows];
}

/**
 * CLEAR ALL COLLECTION!!!
 */
async function clearCollection() {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${table.collection}`
  ));

  dbLogger.warn(`CLEAR COLLECTION...`);
}

module.exports = {
  addCollection: addCollection,
  removeCollection: removeCollection,
  getUserCollection: getUserCollection,
  clearCollection: clearCollection
}