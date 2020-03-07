const fs = require("fs");
const app = require("./app");
const https = require("https");
const express = require("express");
const http = express();

http.get("*", (req, res) => {
    res.redirect("https://" + req.headers.host + req.url);
});
http.listen(80, () => {
    console.log("Http server is up on port 80");
})


https.createServer({
    key: fs.readFileSync("/home/pi/Server/SSL/domain.key"),
    cert: fs.readFileSync("/home/pi/Server/SSL/josephwitten.com.crt")
}, app).listen(443, () => {
    console.log("The HTTPS is running too!")
})

