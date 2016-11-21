var superagent = require("superagent");
var cheerio = require("cheerio");
var config = require("config");
function getItems (){
	var $data = new Promise(function(resolve,reject){
		superagent
			.get(config.get("urls"))
			.end(function (err,res){
				if(err){
					reject(err);
					return ;
				}
				var $ = cheerio.load(res.text);
				var items = [];
				$(".cell .topic_title_wrapper .topic_title").each(function (index,ele){
					items.push([{
						'title' : $(ele).attr('title'),
						'href' : $(ele).attr('href')
					}]);
				});
				resolve(items);
			});
	});
	return $data;
}
module.exports = getItems();
