const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/Public"));

//.com/xss?payload=<img src=x onerror=alert()>
app.get("/xss", (req, res) => {
	res.send(req.query.payload)
})


app.get("*", (req, res) => {
	console.log("hit")
	res.sendFile(path.join(__dirname, "/Public/index.html"));
});

app.listen(80, () => {
    console.log("Http server is up on port 80");
})

