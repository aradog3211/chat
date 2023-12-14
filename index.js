const express = require("express")
const fs = require("fs")
const os = require("os")

app = express()

app.get("/", (req, res) => {
	console.log("OK")
	fs.readFile('data.txt', "utf8", function(err, data) {
	  console.log(data)
	});
	
	res.send("OK")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log("running")
})
