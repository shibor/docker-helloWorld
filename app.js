const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const moment = require('moment-timezone');

const app = express();
// ⬇️ 在服务启动时读取一次，并缓存到内存中
const asciiArt = fs.readFileSync(path.join(__dirname, 'banner.ascii'), 'utf-8');


// 自定义 token：添加 :mydate
logger.token('mydate', function (req, res) {
    return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
});
// 定义完整的日志格式（包含自定义字段）
const format = `:mydate，URL: :url  Status: :status，耗时: :response-time ms - :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;

app.use(logger(format));


app.get('/', (req, res) => {
    const now = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    const output = `${asciiArt}\n\n当前时间：${now}`;
    
    res.type('text/plain');
    res.send(output);
});


// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务已启动，监听端口 ${PORT}`);
});