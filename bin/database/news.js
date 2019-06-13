const db = require('./db');
const table = require('../config/database').table;
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
    FROM ${table.news}
    WHERE BINARY group_id=${db.escape(news.group_id)}`
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
    `INSERT INTO ${table.news} (group_id, title, time, author, image_infos, content)
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
    FROM ${table.news}
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
 * retrieve the content of news with ID
 * @param {string} newsID news ID
 * @return {string} content of news
 */
async function getNewsContent(newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT content
    FROM ${table.news}
    WHERE BINARY group_id=${db.escape(newsID)}`
  ));
  
  if (err) {
    dbLogger.error(`Error to get news:${newsID} content, error message::${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get news:${newsID} content`);
  return [null, rows[0]];

}

/**
 * Update news comment counts
 * @param {string} newsID news to be updated
 * @param {int} comments new comments number
 * @return {Array} [err, bool] is returned and iff [null, true] indicates success.
 */
async function updateNewsComments(newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `UPDATE ${table.news}
    SET comments = comments + 1
    WHERE BINARY group_id = ${db.escape(newsID)}`
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
    `DELETE FROM ${table.news}`
  ));

  dbLogger.warn(`CLEAR NEWS...`);
}

module.exports = {
  addNews: addNews,
  getNews: getNews,
  getNewsContent: getNewsContent,
  updateNewsComments: updateNewsComments,
  clearNews: clearNews
}