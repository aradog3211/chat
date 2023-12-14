const express = require("express")
const fs = require("fs")
const os = require("os")
const cors = require("cors")

var app = express()
app.use(cors())

app.get("/", (req, res) => {
	console.log("OK")
	res.send("OK")
})

app.put("/login", (req, res) => {
	const username = req.headers.username
	const password = req.headers.password
	
	fs.readFile('auth.txt', "utf8", function(err, data) {
		data = data.split("\n")
		data.pop()
		let auth = {}
		for (var x of data) {
			auth[x.split(" ")[0]] = x.split(" ")[1]
		}
		if (auth[username]) {
			if (auth[username] == password) {
				res.send("success")
			} else {
				res.send("wrong password")
			}
		} else {
			res.send("invalid username")
		}
	});
	
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log("running")
})
