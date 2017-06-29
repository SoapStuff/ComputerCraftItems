/**
 * Created by Arjan on 28-6-2017.
 */
const parse = require("csv-parse");
const transform = require('stream-transform');
const fs = require("fs");

var output = [];
var parser = parse({delimiter: ','})
var input = fs.createReadStream('dumps/block.csv');
var transformer = transform(function(record, callback){
    setTimeout(function(){
        callback(null, record.join(' ')+'\n');
    }, 500);
}, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(process.stdout);

