const db = require('./db');
const dbConfig = require('../config/database');
const syncFunc = require('../utils/customSync');
const dbLogger = require('../utils/logger')('dbLogger');

/**
 * Add a news into database
 * @param {object} news new news to be added
 * @return {Array} [err, bool] is returned and iff [null, true] indicates success.
 */
async function addNews(news) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT group_id
    FROM ${dbConfig.newsTable}
    WHERE group_id=${db.escape(news.group_id)}`
  ));

  if (err) {
    dbLogger.error(`Error to add news: ${news.group_id}, error message::${err}`);
    return [err, false];
  }

  if (rows.length !== 0) {
    dbLogger.error(`Fail to add existed news: ${news.group_id}`);
    return [null, false];
  }
  
  [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${dbConfig.newsTable} (group_id, title, time, author, image_infos, content)
    VALUES (${db.escape(news.group_id)}, ${db.escape(news.title)}, ${db.escape(news.time)},
      ${db.escape(news.author)}, '${JSON.stringify(news.image_infos)}', ${db.escape(news.content)});`
    ));
  
  if (err) {
    dbLogger.error(`Error to add news: ${news.group_id}, err:${err}`);
    return [err, false];
  }

  dbLogger.info(`Add news: ${news.group_id}`);
  return [null, true];
}

/**
 * Get specific count news start at specific offset 
 * @param {int} offset begin position
 * @param {int} count news count
 * @return {Array} news array matches begin at offset
 */
async function getNews(offset, count) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT group_id, title, author, time, image_infos, comments
    FROM ${dbConfig.newsTable}
    ORDER BY time
    LIMIT ${db.escape(count)} OFFSET ${db.escape(offset)}`
  ));
  
  if (err) {
    dbLogger.error(`Error to get news at offset:${offset} with count:${count}, error message::${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get news at offset:${offset} with count:${count}`);
  return [null, rows];
}

/**
 * Update news comment counts
 * @param {string} newsID news to be updated
 * @param {int} comments new comments number
 * @return {Array} [err, bool] is returned and iff [null, true] indicates success.
 */
async function updateNewsComments(newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `UPDATE ${dbConfig.newsTable}
    SET comments = comments + 1}
    WHERE group_id = ${newsID}`
  ));

  if (err) {
    dbLogger.error(`Error to update news:${newsID} comments, error message: ${err}`);
    return [err, false];    
  }

  dbLogger.info(`Update news:${newsID} comments`);
  return [null, true];
}

/**
 * CLEAR ALL NEWS!!!
 */
async function clearNews() {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${dbConfig.newsTable}`
  ));

  dbLogger.warn(`CLEAR NEWS...`);
}

module.exports = {
  addNews: addNews,
  getNews: getNews,
  updateNewsComments: updateNewsComments,
  clearNews: clearNews
}