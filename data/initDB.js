const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');

const newsDB = require('../bin/database/news');
const syncFunc = require('../bin/utils/customSync');

const preName = [
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

const postName = ['新闻网', '媒体', '平台', '传媒', '频道', '公众号', '报纸'];

fs.readFile(path.join(__dirname, 'newsData.json'), (err, data) => {
  if (err) {
    console.log(`[ERROR] err:${err}`);
  } else {
    let newsData = JSON.parse(data);
    let bar = new ProgressBar('Processing [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total:newsData.length,
      callback: () => {
        process.exit();
      }
    });
    newsData.forEach(async (element, index) => {
      if (element.length > 0 && element[0].content !== undefined) {
        let news = element[0];
        news.group_id = news.group_id.replace('/', '-');
        news.author = `${preName[parseInt(Math.random()*50)]}${postName[parseInt(Math.random()*7)]}`;
        news.time = Date.UTC(2017, parseInt((Math.random()*12)+1), parseInt((Math.random()*28)+1));
        let [err, status] = await syncFunc(newsDB.addNews(news));
        if (err === null && status) {
          bar.tick();
        } else {
          console.error(`[ERROR] Fail to add news data, error message: ${err}`);
          return;
        }
      }
    });
    console.log('\n[Success] News data added into database!');
  }
});
console.log('\n[Success] News data added into database!');
console.log(`----------  END  INITIALIZATION ----------`);