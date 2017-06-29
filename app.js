/**
 * Created by Arjan on 23-6-2017.
 */
const express = require("express");
const http = require("http");
const url = require("url");
const bodyParser = require("body-parser");
const app = express();
const port = process.argv[2];

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.set('views',__dirname + '/view');
app.set('view engine', 'ejs');

app.use("/", require("./controller"));

console.log(port);
http.createServer(app).listen(port);