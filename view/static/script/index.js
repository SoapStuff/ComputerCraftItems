/**
 * Created by Stijn on 03/07/2017.
 */
var turtles;
var firstIndex;
var list;
var selected;

/**
 * Function that allows for loggin in if both fields have been filled.
 */
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill all fields");
    } else {

        var details = {
            username: username,
            password: password
        };
        $.post("/login", details).done(function (data) {
            if (data !== 'failed') {
                $.cookie('session', data, {expires: 1});
                location.reload(true);
            }
        });
    }

}

/**
 * Set the page of the session to the next page.
 * @param page The page to go to
 */
function setPage(page) {
    $.post("/setPage", {page: page}).done(function () {
        location.reload(true);
    })
}


function hideID(callback) {
    var oldDiv = $('#id-div')[0];

    if (oldDiv !== undefined) {
        oldDiv.parentNode.removeChild(oldDiv);
    }

    if (callback !== undefined) {
        callback();
    }
}

function showID(item) {
    var id = item.id;
    var x = event.clientX;
    var y = event.clientY;

    hideID(function () {
        var div = document.createElement('DIV');
        div.style.position = 'absolute';
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.innerHTML = id;
        div.id = 'id-div';

        document.body.appendChild(div);
    });
}

function clearPanel(callback) {
    if (callback !== undefined) {
        callback();
    }
}

/**
 * Select a turtle to be the selected turtle
 * @param img The img element holding the turtle
 */
function selectTurtle(img) {
    var id = img.id;
    var imgList = document.getElementsByTagName("img");
    for (var i = 0; i < imgList.length; i++) {
        var image = imgList[i];

        if (image.src.indexOf('Slot') !== -1) {
            if (image.id === id) {
                image.src = "static/imgs/selectedSlot.png";
                selected = id;
            } else {
                image.src = "static/imgs/unselectedSlot.png";
            }
        }
    }

    if (selected !== undefined) {
        clearPanel(function () {
            var details = {selected: selected};
            $.post("/getTurtleDetails", details).done(function (data) {
                var inventory = data.inventory;

                var controls = data.controls;

                var actions = data.actions;

                var information = data.information;

                document.body.appendChild(inventory);

                document.body.appendChild(controls);

                document.body.appendChild(actions);

                document.body.appendChild(information);
            })
        });
    }
}

/**
 * Display the turtles onscreen.
 */
function showTurtles() {
    for (var i = 0; i < 3; i++) {
        var index = i + firstIndex;

        if (index >= turtles.length) {
            index -= turtles.length;
        }

        if (selected !== undefined && selected === turtles[index]) {
            list.append(
                "<li id='" + turtles[index] + "' onmouseenter='showID(this)' onmouseleave='hideID()' >" +
                "    <img id='" + turtles[index] + "' class='background' onclick='selectTurtle(this)' src='static/imgs/selectedSlot.png'> " +
                "    <img id='" + turtles[index] + "' class='foreground' onclick='selectTurtle(this)' src='static/imgs/turtle.png'> " +
                "</li>"
            )
        } else {
            list.append(
                "<li id='" + turtles[index] + "' onmouseenter='showID(this)' onmouseleave='hideID()' >" +
                "    <img id='" + turtles[index] + "' class='background' onclick='selectTurtle(this)' src='static/imgs/unselectedSlot.png'> " +
                "    <img id='" + turtles[index] + "' class='foreground' onclick='selectTurtle(this)' src='static/imgs/turtle.png'> " +
                "</li>"
            )
        }
    }

    list.append(
        "<li id='down-scroll'><img class='down-scroll' onclick='scroll()' src='static/imgs/TempScrollArrow.png'></li>"
    );
}

/**
 * Clear the turtle list from the screen.
 * @param callback A callback
 */
function removeTurtles(callback) {
    turtles.forEach(function (id) {
        var turtle = $('#' + id)[0];

        if (turtle !== undefined) {
            turtle.parentNode.removeChild(turtle);
        }
    });

    var scroll = $('#down-scroll')[0];

    if (scroll !== undefined) {
        scroll.parentNode.removeChild(scroll);
    }

    callback();
}

/**
 * Scroll up or down depending on the arrow pressed.
 * @param direction The direction to scroll to
 */
function scroll(direction) {
    var index = firstIndex;

    if (direction !== undefined && direction === 'up') {
        index++;

        if (index === turtles.length) {
            index = 0;
        }
    } else {
        index--;

        if (index === -1) {
            index = turtles.length - 1;
        }
    }

    firstIndex = index;

    removeTurtles(function () {
        showTurtles();
    });
}

/**
 * The init function of the page.
 */
$(document).ready(function () {
    if ($('#turtle-container')[0]) {
        $.get('/getTurtleIDList').done(function (data) {
            turtles = data.split(",");
            list = $("#turtle-container");
            firstIndex = 0;
            showTurtles();
        });
    }
});