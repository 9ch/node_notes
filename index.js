var express = require("express");
var cheerio = require("cheerio");
var superagent = require("superagent");
var app = new express;
var globalArray = [];
app.get('/',function (request,response) {
    superagent
        .get('http://cnodejs.org/')
        .end(function (err,res) {
            if(err){
                console.log(err);
            }
            var $ = cheerio.load(res.text);
            var items = [];
            $('.cell .topic_title_wrapper .topic_title').each(function (index, element) {
                items.push({
                    title : $(element).attr('title'),
                    href : "http://cnodejs.org"+$(element).attr('href')
                });
            });
            globalArray = items;
            response.send(items);
        });
});
console.log(globalArray);
app.listen(3000);