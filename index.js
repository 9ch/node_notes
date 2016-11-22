var data = require("./getdata");
var superagent = require("superagent");
var cheerio = require("cheerio");
data.then(function (info) {//获取到数据，进行处理
    let article = [];
    for ( let i in info){
        var href = "http://cnodejs.org"+info[i].href;
        superagent
            .get(href)
            .end(function (err, data) {
                if(err){
                    console.log(err);
                    return ;
                }
                var $ = cheerio.load(data.text);
                var $get = new Promise(function (resolve,reject){//异步爬取文章的标题和作者信息。
                    $('.topic_header').each(function (index,ele){
                        article.push({
                            title : $(ele).find('.topic_full_title').text().trim(),
                            author : $(ele).find('.changes').find('span').eq(1).find('a').text().trim()
                        })
                    });
                    resolve(article);
                });
                $get.then(function (data){
                    console.log(data);
                });
            });
    }
});
