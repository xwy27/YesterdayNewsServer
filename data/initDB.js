const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');

const db = require('../bin/database/db');
const newsDB = require('../bin/database/news');
const dbConfig = require('../bin/config/database');
const syncFunc = require('../bin/utils/customSync');

let preName = [
  'Smith',' Anderson',' Clark',' Wright',' Mitchell',
  'Johnson',' Thomas',' Rodriguez',' Lopez',' Perez',
  'Williams',' Jackson',' Lewis',' Hill',' Roberts',
  'Jones',' White',' Lee',' Scott',' Turner',
  'Brown',' Harris',' Walker',' Green',' Phillips',
  'Davis',' Martin',' Hall',' Adams',' Campbell',
  'Miller',' Thompson',' Allen',' Baker',' Parker',
  'Wilson',' Garcia',' Young',' Gonzalez',' Evans',
  'Moore',' Martinez',' Hernandez',' Nelson',' Edwards',
  'Taylor',' Robinson',' King',' Carter',' Collins',
];
let postName = ['新闻网', '媒体', '平台', '传媒', '频道', '公众号', '报纸'];

fs.readFile(path.join(__dirname, 'news.json'), (err, data) => {
  if (err) {
    console.log(`[ERROR] err:${err}`);
  } else {
    let newsData = JSON.parse(data);
    let bar = new ProgressBar('downloading [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total:newsData.length
    });
    newsData.forEach((element, index) => {
      if (element.length > 0 && element[0].content !== undefined) {
        let news = element[0];
        news.author = `${preName[parseInt(Math.random()*50)]}${postName[parseInt(Math.random()*7)]}`;
        news.time = Date.UTC(2017, parseInt((Math.random()*12)+1), parseInt((Math.random()*28)+1));
        newsDB.addNews(news);
        bar.tick(1);
      }
    });
    console.log('\n[Success] News data added into database!');
  }
});