/**
 * Created by Stijn on 07/07/2017.
 */
var buildControl = function (turtle, callback) {
    var panel = document.createElement('DIV');

    var upKey = document.createElement('IMG');
    var downKey = document.createElement('IMG');
    var leftKey = document.createElement('IMG');
    var rightKey = document.createElement('IMG');
    var rotateRight = document.createElement('IMG');
    var rotateLeft = document.createElement('IMG');
    var forwardKey = document.createElement('IMG');
    var backKey = document.createElement('IMG');
    var useKey = document.createElement('DIV');

    upKey.src = 'static/imgs/stairsUp';
    downKey.src = 'static/imgs/stairsDown';
    forwardKey.src = 'static/imgs/straightArrow';
    rightKey.src = 'static/imgs/straightArrow';
    backKey.src = 'static/imgs/straightArrow';
    leftKey.src = 'static/imgs/straightArrow';
    rotateLeft.src = 'static/imgs/curveArrow';
    rotateRight.src = 'static/imgs/curveArrow';

    forwardKey.style.rotation = '180deg';
    rightKey.style.rotation = '270deg';
    leftKey.style.rotation = '90deg';

    rotateLeft.transform = 'scaleX(-1)';

    var useImg = document.createElement('IMG');
    useImg.src = 'static/imgs/unselectedslot.png'
    useKey.appendChild();

    panel.appendChild(rotateRight);
    panel.appendChild(leftKey);
    panel.appendChild(upKey);
    panel.appendChild(forwardKey);
    panel.appendChild(useKey);
    panel.appendChild(backKey);
    panel.appendChild(rotateLeft);
    panel.appendChild(rightKey);
    panel.appendChild(downKey);

    callback(panel);
};

var buildActions = function (turtle, callback) {

};

var buildInformation = function (turtle, callback) {

};

var buildInventory = function (turtle, callback) {

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

