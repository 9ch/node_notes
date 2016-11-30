var fs = require("fs");
var $text = new Promise(function (resolve, reject) {
    fs.exists('./config/test.txt',function (exists) {
        if(!exists){
            resolve(-1)
        }
        resolve(1);
    });
})
.then(function (data) {
    if(data == 1){
        return new Promise(function (resolve, reject) {
            fs.stat("./config/test.txt",function (err,state) {
                if(err) {
                    console.log(err);
                }
                resolve(state.atime);
            })
        })
    }
    else if(data == -1){
        return new Promise(function (resolve,reject) {
            let text = "hello world";
            fs.writeFile('./config/test.txt',text,function (err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(new Date());
                }
            });
        })
    }
})
.then(function (date) {
    let time = new Date();
    console.log(time-date);

});
