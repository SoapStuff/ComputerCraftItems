/**
 * Created by Arjan on 26-7-2017.
 */
var normalizedPath = require("path").join(__dirname, "");
var passedTests = 0;
var failedTests = 0;
var failedTestsList = [];
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if (file.indexOf("Test.js") > -1) {
        var localPassedTests = 0;
        var localFailedTests = 0;
        var localFailedTestsList = [];
        var test = require("./" + file);
        for (var k in test) {
            if(test.hasOwnProperty(k)) {
                try {
                    if(test[k]()) {
                        passedTests += 1;
                        localPassedTests += 1;
                    } else {
                        failedTests += 1;
                        localFailedTests += 1;
                        failedTestsList.push({file: file, test: k, error: "Failed"});
                        localFailedTestsList.push({file: file, test: k, error: "Failed"});
                    }
                }
                catch (error) {
                    failedTests += 1;
                    localFailedTests += 1;
                    failedTestsList.push({file: file, test: k, error: error.toString()});
                    localFailedTestsList.push({file: file, test: k, error: error.toString()});
                }
            }
        }
        console.log("--------------------------");
        console.log("*** " + file + " ***");
        console.log("Passed Tests: " + localPassedTests);
        console.log("Failed Tests: " + localFailedTests);
        for(var i = 0; i < localFailedTestsList.length; i++) {
            console.log(localFailedTestsList[i]);
            console.log("")
        }
    }
});
console.log("--------------------------");
console.log("*** Tests Results: ***");
console.log("Passed Tests: " + passedTests);
console.log("Failed Tests: " + failedTests);