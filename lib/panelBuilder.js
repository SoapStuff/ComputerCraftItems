/**
 * Created by Stijn on 07/07/2017.
 */
const logger = require('../model/logger'),
    turtlebase = require('../model/turtlebase');

var buildControl = function (turtle, callback) {
   var table = "<table id='control-table'>";

    var upKey = "<img id='upKey' onclick='keyPressed(this)' class='up-key key' src='static/imgs/stairsUp.png'>";
    var downKey = "<img id='downKey' onclick='keyPressed(this)' class='down-key key' src='static/imgs/stairsDown.png'>";
    var rotateRight = "<img id='rotateRight' onclick='keyPressed(this)' class='rotate-right key' src='static/imgs/curveArrow.png'>";
    var rotateLeft = "<img id='rotateLeft' onclick='keyPressed(this)' class='rotate-left key' src='static/imgs/curveArrow.png'>";
    var forwardKey = "<img id='forwardKey' onclick='keyPressed(this)' class='forward-key key' src='static/imgs/straightArrow.png'>";
    var backKey = "<img id='backKey' onclick='keyPressed(this)' class='back-key key' src='static/imgs/straightArrow.png'>";
    var rightKey = "<img id='rightKey' onclick='keyPressed(this)' class='right-key key' src='static/imgs/straightArrow.png'>";
    var leftKey = "<img id='leftKey' onclick='keyPressed(this)' class='left-key key' src='static/imgs/straightArrow.png'>";
    var useKey = "<div id='useKey' onclick='keyPressed(this)' style='width: 100%; height: auto'><img style='width: 100%; height: auto;' src='static/imgs/unselectedSlot.png'></div>";

    var firstRow =
        "<tr>" +
        "<td>" + rotateRight + "</td>" +
        "<td>" + forwardKey + "</td>" +
        "<td>" + rotateLeft + "</td>" +
        "</tr>";

    var secondRow =
        "<tr>" +
        "<td>" + leftKey + "</td>" +
        "<td>" + useKey + "</td>" +
        "<td>" + rightKey + "</td>" +
        "</tr>";

    var thirdRow =
        "<tr>" +
        "<td>" + downKey + "</td>" +
        "<td>" + backKey + "</td>" +
        "<td>" + upKey + "</td>" +
        "</tr>";

    table += firstRow + secondRow + thirdRow + "</table>";

    logger.log("[Panelbuilder] Controlpanel build");

    callback(table);
};

var buildActions = function (turtle, callback) {
    var panel = "<div>";

    logger.log("[Panelbuilder] Actionpanel build");

    callback(panel);
};

var buildInformation = function (turtle, callback) {
    var panel = "<div>";

    logger.log("[Panelbuilder] Informationpanel build");

    callback(panel);
};

var buildInventory = function (turtle, callback) {
    var table = "<table>";

    logger.log("[Panelbuilder] Inventorypanel build");

    turtle.getInventory(function (inventory) {
        var firstRow = "<tr>";
        var secondRow = "<tr>";

        if (inventory.length !== undefined) {
            for (var i = 0; i < 16; i++) {
                if (i < 8) {
                    firstRow += "<td><img src='static/imgs/unselectedSlot.png'>";
                    firstRow += "<img src='" + inventory[i].getImageSrc() + "'>";
                    firstRow += "</td>";
                } else {
                    secondRow += "";
                }

            }
        }

        firstRow += "</tr>";
        secondRow += "</tr>";
        table += firstRow + secondRow + "</table>";
        callback(table);
    });
};

module.exports.buildTurtlePanel = function (turtle, callback) {
    buildControl(turtle, function (controlPanel) {
        buildActions(turtle, function (actionPanel) {
            buildInformation(turtle, function (informationPanel) {
                buildInventory(turtle, function (inventoryPanel) {
                    var panel = {
                        inventory: inventoryPanel,
                        information: informationPanel,
                        actions: actionPanel,
                        control: controlPanel
                    };

                    if (callback !== undefined) {
                        callback(panel);
                    }

                    return panel;
                })
            })
        })
    })
};

