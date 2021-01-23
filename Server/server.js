const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const app = express();

app.use(function (req, res, next) {
	if (req.secure) {
		return next()
	} else {

	let target = 'https://' + req.hostname + req.url
		res.redirect(301, target)
	}
});

app.use(express.static(__dirname + "/Public"));



app.get("*", (req, res) => {
	console.log("hit")
	res.sendFile(path.join(__dirname, "/Public/index.html"));
});

app.listen(80, () => {
    console.log("Http server is up on port 80");
})




https.createServer({
    key: fs.readFileSync(__dirname + "/SSL/domain.key"),
    cert: fs.readFileSync(__dirname + "/SSL/josephwitten.com.crt")
}, app).listen(443, () => {
    console.log("The HTTPS is running too!")

})


