var data = require("./getdata");
var superagent = require("superagent");
var cheerio = require("cheerio");
data.then(function (info) {//获取到数据，进行处理
    console.log(info)
});
