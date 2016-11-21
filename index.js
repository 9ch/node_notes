// var express = require("express");
// var app = new express();
var data = require('./getdata.js');
data.then(doData);

function doData(data){
	console.log(data);
}
