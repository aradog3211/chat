const express = require("express")
const fs = require("fs")
const os = require("os")
const cors = require("cors")

var app = express()
app.use(cors())

app.get("/", (req, res) => {
	console.log(Date.now() + ": status check")
	res.send("running")
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
				fs.appendFile("logs.txt", "\n" + Date.now() + ": successful login - " + username + ":" + password, (err) => { 
					if (err) console.log(err); 
					else {
						console.log(Date.now() + ": successful login - " + username + ":" + password)
						res.send("success")
					} 
				}); 
			} else {
				fs.appendFile("logs.txt", "\n" + Date.now() + ": failed login, wrong password - " + username + ":" + password, (err) => { 
					if (err) console.log(err); 
					else {
						console.log(Date.now() + ": failed login, wrong password - " + username + ":" + password)
						res.send("wrong password")
					} 
				}); 
			}
		} else {
			fs.appendFile("logs.txt", "\n" + Date.now() + ": failed login, invalid username - " + username + ":" + password, (err) => { 
				if (err) console.log(err); 
				else {
					console.log(Date.now() + ": failed login, invalid username - " + username + ":" + password)
					res.send("invalid username")
				} 
			}); 
		}
	});
})

app.put("/fetch", (req, res) => {
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
				fs.appendFile("logs.txt", "\n" + Date.now() + ": successful fetch - " + username + ":" + password, (err) => { 
					if (err) console.log(err); 
					else {
						console.log(Date.now() + ": successful fetch - " + username + ":" + password)
						fs.readFile('data.txt', "utf8", function(err, data) {
							data = data.split("\n")
							data.pop()
							let messages = []
							for (var x of data) {
								messages.push({message: x.split(" ")[2], time: x.split(" ")[0], username: x.split(" ")[1]})
							}
							res.send(messages)
						})
					} 
				}); 
			} else {
				fs.appendFile("logs.txt", "\n" + Date.now() + ": failed fetch, wrong password - " + username + ":" + password, (err) => { 
					if (err) console.log(err); 
					else {
						console.log(Date.now() + ": failed fetch, wrong password - " + username + ":" + password)
						res.send("wrong password")
					} 
				}); 
			}
		} else {
			fs.appendFile("logs.txt", "\n" + Date.now() + ": failed fetch, invalid username - " + username + ":" + password, (err) => { 
				if (err) console.log(err); 
				else {
					console.log(Date.now() + ": failed fetch, invalid username - " + username + ":" + password)
					res.send("invalid username")
				}
			}); 
		}
	});
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log("running")
})
