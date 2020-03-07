const express = require("express");
const app = express();

app.use(express.static("Public"));

module.exports = app;
