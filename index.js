var express = require("express")
var fs = require("fs")
var os = require("os")

app = express()

app.get("/", (req, res) => {
	console.log("OK")
	fs.readFile('data.txt', "utf8", function(err, data) {
	  console.log(data)
	});
	
	res.send("OK")
})

app.listen(3000)
