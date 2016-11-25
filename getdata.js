var superagent = require("superagent");
var cheerio = require("cheerio");
var fs = require('fs');
function getItems() {
    let $data = new Promise(function (resolve, reject) {//使用promise进行异步操作
        let $text = new Promise(function (resolve, reject) {
            fs.readFile('./config/text.html', function (err, data) {//使用缓存后的数据进行读取
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data.toString());
                return $text;
            });
        });
        $text.then(function (data) {//读取相应内容进行筛选处理
            var $ = cheerio.load(data);
            var items = [];
            $('.cell .topic_title_wrapper .topic_title').each(function (index, ele) {
                items.push({
                    title: $(ele).attr("title"),
                    href: $(ele).attr("href")
                });
            });
            resolve(items);
        });
    });
    return $data;
}
module.exports = getItems();
