const fs = require('fs');
const path = require('path');

// Logger middleware
function logger(msg) {
  let date = new Date();
  let logPath = '../../logs/server.log';
  if (msg) {
    fs.appendFileSync(
      path.resolve(__dirname, logPath),
      `${date.toUTCString()} [MSG] ${msg}\n`
    );
  } else {
    return async (ctx, next) => {
      fs.appendFileSync(
        path.resolve(__dirname, logPath),
        `${date.toUTCString()} [${ctx.request.method}] ${ctx.request.url}\n`
      );
      await next();
    }
  }
}


module.exports = logger;