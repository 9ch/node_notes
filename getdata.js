var superagent = require("superagent");
var cheerio = require("cheerio");
var fs = require('fs');
function getItems() {
    let $data = new Promise(function (resolve, reject) {//使用promise进行异步操作
        let $text = new Promise(function (resolve, reject) {//先确认是否有这个文件.
            fs.exists('./config/text.html',function (exist) {
                resolve(exist);
            });
        })
        .then(function (exist) {
            return new Promise(function (resolve, reject) {
                if (exist){//获取文件的日期.
                    fs.stat("./config/text.html",function (err,state) {
                        if(err) {
                            console.log(err);
                        }
                        resolve(state.atime);
                    });
                }
                else{
                    getData().then(function (data) {
                        fs.writeFile("./config/text.html",data,function (err) {
                            if(err){
                                console.log(err);
                                console.log(1);
                                reject(err);
                            }
                            resolve(new Date());
                        });
                    });
                }
            })

        })
        .then(function (date) {
                var time = new Date();
                return new Promise(function (resolve,reject){
                    if((time-date) >= 1000000){
                    getData().then(function (data) {
                        fs.writeFile("./config/text.html",data,function (err) {
                            if(err){
                                console.log(err);
                                console.log(2);
                                reject(err);
                            }
                            resolve(data);
                        });
                    })
                }
                else{
                    fs.readFile('./config/text.html',function (err,data) {
                        if(err){
                            console.log(err);
                            console.log(3);
                            reject(err);
                        }
                        else{
                            resolve(data);
                        }
                    })
                }
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
function getData() {
    return new Promise(function (resolve, reject) {
        superagent
            .get('cnodejs.org')
            .end(function (err, data) {
                if(err){
                    console.log(err);
                    console.log(4);
                    reject(err);
                }
                else{
                    resolve(data.text);
                }
            });
    })
}
module.exports = getItems();
