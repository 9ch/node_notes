var data = require("./getdata");
data.then(function(info){
    console.log(info.length);
});