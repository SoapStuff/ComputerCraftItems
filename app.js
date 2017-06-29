/**
 * Created by Arjan on 23-6-2017.
 */
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const port = process.argv[2];

var itembase = require('./model/itembase');
var commandbase = require('./model/commandbase');

itembase.init();
commandbase.init();

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(__dirname + '/view/static'));

app.set('views',__dirname + '/view');
app.set('view engine', 'ejs');

app.use("/", require("./controller"));

http.createServer(app).listen(port);
console.log("[Server] Server started on port " + port);